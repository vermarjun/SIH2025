import React, { useState, useEffect } from "react";
import { User, Lock, Upload, Trash2, Eye, EyeOff, Save, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Separator } from "@/Components/ui/separator";
import { Badge } from "@/Components/ui/badge";
import api from "@/api";

interface UserData {
  id: string;
  username: string;
  email: string;
  bio?: string;
  profilePhoto?: string;
  plan?: string;
  role?: string;
}

interface FormData {
  username: string;
  email: string;
  bio: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SkeletonLoader = () => (
  <div className="w-full max-w-none mx-auto p-3 sm:p-4 lg:p-6 space-y-6 lg:space-y-8">
    <div className="space-y-2">
      <div className="h-6 sm:h-8 bg-gray-200 rounded-lg w-32 sm:w-48 animate-pulse" />
      <div className="h-3 sm:h-4 bg-gray-200 rounded w-48 sm:w-64 animate-pulse" />
    </div>
    <div className="space-y-6">
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-10 sm:h-12 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
      <div className="space-y-4 sm:space-y-6">
        <div className="h-48 sm:h-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="h-10 bg-gray-200 rounded w-full sm:w-32 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-full sm:w-24 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const Settings: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    bio: "",
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
      setFormData({
        username: response.data.username || "",
        email: response.data.email || "",
        bio: response.data.bio || "",
      });
    } catch (error: any) {
      toast.error("Failed to load user data");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put("/users/me", formData);
      setUser(response.data);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await api.put("/users/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password changed successfully");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("profilePhoto", file);
      const response = await api.post("/users/profile-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (user) {
        setUser({ ...user, profilePhoto: response.data.profilePhoto });
      }
      toast.success("Profile photo updated successfully");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to upload profile photo"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      await api.delete("/users/me");
      toast.success("Account deleted successfully");
      window.location.href = "/";
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to delete account"
      );
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (initialLoading) {
    return <SkeletonLoader />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <Alert className="max-w-md w-full bg-gray-50 border-gray-200">
          <AlertDescription className="text-gray-700">
            Failed to load user data. Please refresh the page and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="w-full max-w-none mx-auto p-3 sm:p-4 lg:p-6">
        {/* Message Alert */}
        {message && (
          <Alert
            className={`mb-4 sm:mb-6 ${
              message.type === "error"
                ? "border-red-200 bg-red-50"
                : "border-green-200 bg-green-50"
            }`}
          >
            <AlertDescription className="flex items-center justify-between">
              <span
                className={
                  message.type === "error" ? "text-red-700" : "text-green-700"
                }
              >
                {message.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMessage(null)}
                className="h-6 w-6 p-0 hover:bg-transparent text-gray-400 hover:text-gray-700 flex-shrink-0 ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4 sm:space-y-6"
        >
          <div className="w-full overflow-x-auto">
            <TabsList className="grid w-full min-w-[300px] max-w-md grid-cols-3 bg-white border border-gray-200 shadow-sm mx-auto">
              <TabsTrigger
                value="profile"
                className="text-gray-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors text-xs sm:text-sm px-2 sm:px-3"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="text-gray-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors text-xs sm:text-sm px-2 sm:px-3"
              >
                <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Password</span>
              </TabsTrigger>
              <TabsTrigger
                value="danger"
                className="text-gray-600 data-[state=active]:bg-red-50 data-[state=active]:text-red-700 data-[state=active]:border-b-2 data-[state=active]:border-red-600 transition-colors text-xs sm:text-sm px-2 sm:px-3"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Danger</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="">
                <CardTitle className="text-lg sm:text-xl text-gray-900">
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className=" space-y-4">
                {/* Profile Photo Section */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-gray-200 shadow-sm">
                      <AvatarImage src={user.profilePhoto} alt="Profile" />
                      <AvatarFallback className="bg-gray-100 text-lg sm:text-xl text-gray-600">
                        {user.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {user.username}
                      </h3>
                      {user.plan && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 border-blue-200 w-fit"
                        >
                          {user.plan}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-xs sm:text-sm px-2 sm:px-3"
                        onClick={() =>
                          document.getElementById("photo-upload")?.click()
                        }
                        disabled={loading}
                      >
                        <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Upload Photo
                      </Button>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-200" />

                {/* Profile Form */}
                <form
                  onSubmit={handleProfileUpdate}
                  className="space-y-4 w-full max-w-md"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="bio"
                      className="text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 min-h-[80px] resize-none text-sm sm:text-base"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto text-sm sm:text-base"
                  >
                    <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-gray-900">
                  Change Password
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600">
                  Update your account password
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form
                  onSubmit={handlePasswordChange}
                  className="space-y-4 w-full max-w-md"
                >
                  {(["current", "new", "confirm"] as const).map((field) => (
                    <div key={field} className="space-y-2">
                      <Label className="text-xs sm:text-sm font-medium text-gray-700">
                        {field === "current"
                          ? "Current Password"
                          : field === "new"
                          ? "New Password"
                          : "Confirm New Password"}
                      </Label>
                      <div className="relative">
                        <Input
                          type={showPasswords[field] ? "text" : "password"}
                          value={
                            passwordData[
                              field === "current"
                                ? "currentPassword"
                                : field === "new"
                                ? "newPassword"
                                : "confirmPassword"
                            ]
                          }
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              [field === "current"
                                ? "currentPassword"
                                : field === "new"
                                ? "newPassword"
                                : "confirmPassword"]: e.target.value,
                            })
                          }
                          className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 pr-10 text-sm sm:text-base"
                          required
                          minLength={field !== "current" ? 6 : undefined}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 text-gray-400 hover:text-gray-700"
                          onClick={() => togglePasswordVisibility(field)}
                        >
                          {showPasswords[field] ? (
                            <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                          ) : (
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto text-sm sm:text-base"
                  >
                    <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {loading ? "Changing..." : "Change Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger">
            <Card className="bg-white border border-red-200 shadow-sm">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-red-700">
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-red-600">
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-red-700">
                    Delete Account
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Once you delete your account, there is no going back. Please
                    be certain. All your data will be permanently removed and
                    cannot be recovered.
                  </p>
                  <Button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm w-full sm:w-auto text-sm sm:text-base"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {loading ? "Deleting..." : "Delete Account"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;