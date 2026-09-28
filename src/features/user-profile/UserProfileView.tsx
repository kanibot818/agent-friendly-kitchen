import { useState } from "react";
import {
  INITIAL_USER_PROFILE_STATE,
  nextUserProfile,
} from "./userProfileLogic";

export function UserProfileView() {
  const [state, setState] = useState(INITIAL_USER_PROFILE_STATE);

  const handleEdit = () => {
    setState((current) => nextUserProfile(current, { type: "edit" }));
  };

  const handleSave = () => {
    setState((current) => nextUserProfile(current, { type: "save" }));
  };

  const handleNameChange = (value: string) => {
    setState((current) =>
      nextUserProfile(current, { type: "change-name", name: value }),
    );
  };

  const handleEmailChange = (value: string) => {
    setState((current) =>
      nextUserProfile(current, { type: "change-email", email: value }),
    );
  };

  return (
    <section data-testid="user-profile-root" className="user-profile card">
      <h2 data-testid="user-profile-title">User Profile</h2>
      {state.mode === "view" ? (
        <div data-testid="user-profile-card" className="user-profile-card">
          <p data-testid="user-name">{state.profile.name}</p>
          <p data-testid="user-email">{state.profile.email}</p>
          {state.savedMessage ? (
            <p data-testid="save-success">{state.savedMessage}</p>
          ) : null}
          <div className="user-profile-actions">
            <button
              type="button"
              className="btn btn-primary"
              data-testid="edit-btn"
              onClick={handleEdit}
            >
              編輯
            </button>
          </div>
        </div>
      ) : (
        <form
          data-testid="user-profile-form"
          className="user-profile-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          <label className="field user-profile-field">
            <span>姓名</span>
            <input
              data-testid="user-name-input"
              type="text"
              value={state.draft.name}
              onChange={(event) => handleNameChange(event.target.value)}
            />
          </label>
          <label className="field user-profile-field">
            <span>Email</span>
            <input
              data-testid="user-email-input"
              type="email"
              value={state.draft.email}
              onChange={(event) => handleEmailChange(event.target.value)}
            />
          </label>
          <div className="user-profile-actions">
            <button type="submit" className="btn btn-primary" data-testid="save-btn">
              儲存
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
