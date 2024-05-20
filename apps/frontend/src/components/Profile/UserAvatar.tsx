import { Box } from "@mui/material"
import { useAppSelector } from "../../hooks";
import school from "../../assets/img/shool.jpg";
import { ChangeEvent } from "react";
interface UserAvatarProps{
    selectedFile: Blob | MediaSource | null,
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void  
}

export const UserAvatar = ({selectedFile, handleFileChange}: UserAvatarProps) => 
{
const user = useAppSelector((state) => state.user.data);
    return(
        <>
        <Box
            sx={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "black",
              color: "white",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <img
                src={
                  user?.avatarKey
                    ? `${import.meta.env.VITE_S3_BASE_URL}/${user.avatarKey}`
                    : school
                }
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
            <input
              type="file"
              onChange={handleFileChange}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            ></input>
          </Box>

        </>
    ) 
}