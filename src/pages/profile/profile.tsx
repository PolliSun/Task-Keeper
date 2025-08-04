import { FC, useRef, useState } from "react";
import { ProfileUI } from "../../components/ui/pages/profile/profile";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export const Profile: FC = () => {
    const { user, logout} = useUser();
    const [isEdit, setIsEdit] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleLogout = () => {
        logout.mutate();
        navigate("/");
    }

    const navigate = useNavigate();

    const onSaveClick = () => {
        setIsEdit(false);
        navigate("/profile");
    }

    const onEditClick = () => {
        setIsEdit(true);
    }

    const onCancelClick = () => {
        setIsEdit(false);
        navigate("/profile");
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <ProfileUI user={user} onLogout={handleLogout} onAvatarClick={handleAvatarClick} onEdit={onEditClick} onSave={onSaveClick} isEdit={isEdit} onCancel={onCancelClick} fileInputRef={fileInputRef} />
    )
}