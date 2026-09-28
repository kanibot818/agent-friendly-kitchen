import type { UserProfile, UserProfileAction, UserProfileState } from "./userProfileTypes";

export const INITIAL_PROFILE: UserProfile = {
  name: "Alex Huang",
  email: "alex@example.com",
};

export const INITIAL_USER_PROFILE_STATE: UserProfileState = {
  profile: INITIAL_PROFILE,
  mode: "view",
  savedMessage: null,
  draft: INITIAL_PROFILE,
};

export function nextUserProfile(
  state: UserProfileState,
  action: UserProfileAction,
): UserProfileState {
  if (action.type === "edit") {
    return {
      ...state,
      mode: "edit",
      savedMessage: null,
      draft: state.profile,
    };
  }

  if (action.type === "change-name") {
    return {
      ...state,
      draft: { ...state.draft, name: action.name },
    };
  }

  if (action.type === "change-email") {
    return {
      ...state,
      draft: { ...state.draft, email: action.email },
    };
  }

  if (action.type === "save") {
    return {
      profile: state.draft,
      mode: "view",
      savedMessage: "儲存成功",
      draft: state.draft,
    };
  }

  if (action.type === "cancel") {
    return {
      ...state,
      mode: "view",
      draft: state.profile,
      savedMessage: null,
    };
  }

  return state;
}
