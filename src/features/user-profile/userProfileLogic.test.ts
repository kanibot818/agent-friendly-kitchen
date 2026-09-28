import { describe, expect, it } from "vitest";
import {
  INITIAL_USER_PROFILE_STATE,
  nextUserProfile,
} from "./userProfileLogic";

describe("nextUserProfile", () => {
  it("starts in view mode with name and email", () => {
    expect(INITIAL_USER_PROFILE_STATE.mode).toBe("view");
    expect(INITIAL_USER_PROFILE_STATE.profile.name).toBe("Alex Huang");
    expect(INITIAL_USER_PROFILE_STATE.profile.email).toBe("alex@example.com");
    expect(INITIAL_USER_PROFILE_STATE.savedMessage).toBeNull();
  });

  it("enters edit mode with a draft copy", () => {
    const edited = nextUserProfile(INITIAL_USER_PROFILE_STATE, { type: "edit" });
    expect(edited.mode).toBe("edit");
    expect(edited.draft).toEqual(INITIAL_USER_PROFILE_STATE.profile);
    expect(edited.savedMessage).toBeNull();
  });

  it("updates draft fields while editing", () => {
    const editing = nextUserProfile(INITIAL_USER_PROFILE_STATE, { type: "edit" });
    const named = nextUserProfile(editing, {
      type: "change-name",
      name: "Taylor",
    });
    const emailed = nextUserProfile(named, {
      type: "change-email",
      email: "taylor@example.com",
    });
    expect(emailed.draft.name).toBe("Taylor");
    expect(emailed.draft.email).toBe("taylor@example.com");
    expect(emailed.profile).toEqual(INITIAL_USER_PROFILE_STATE.profile);
  });

  it("saves draft to profile and shows success message", () => {
    const editing = nextUserProfile(INITIAL_USER_PROFILE_STATE, { type: "edit" });
    const named = nextUserProfile(editing, {
      type: "change-name",
      name: "Jordan",
    });
    const emailed = nextUserProfile(named, {
      type: "change-email",
      email: "jordan@example.com",
    });
    const saved = nextUserProfile(emailed, { type: "save" });
    expect(saved.mode).toBe("view");
    expect(saved.profile.name).toBe("Jordan");
    expect(saved.profile.email).toBe("jordan@example.com");
    expect(saved.savedMessage).toBe("儲存成功");
  });
});
