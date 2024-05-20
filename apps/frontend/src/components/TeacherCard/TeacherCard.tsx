import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { User } from "../../TypesAndInterfaces";
import school from "../../assets/img/shool.jpg";
import { SxProps } from "@mui/material";
interface TeacherCardProps{
    user: User,
    sxStyles?: SxProps;
}

export default function TeacherCard({user, sxStyles} : TeacherCardProps) {
   
const avatarURL =user.avatarKey ? `${import.meta.env.VITE_S3_BASE_URL}/${user.avatarKey}` : school;
  return (
    <Card sx={{ display: "flex", padding: "14px", ...sxStyles}}>
      <CardMedia
        component="img"
        sx={{ width: 75, height: 75, borderRadius: "50%" }}
        image={`${avatarURL}`}
        alt="avatar"
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography paragraph={true}  variant="h4">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
