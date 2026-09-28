export type UserProfile = {
  name: string;
  email: string;
};

export type UserProfileMode = "view" | "edit";

export type UserProfileState = {
  profile: UserProfile;
  mode: UserProfileMode;
  savedMessage: string | null;
  draft: UserProfile;
};

export type UserProfileAction =
  | { type: "edit" }
  | { type: "save" }
  | { type: "change-name"; name: string }
  | { type: "change-email"; email: string }
  | { type: "cancel" };
