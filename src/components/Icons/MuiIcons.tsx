import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CircleIcon from '@mui/icons-material/Circle'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUp'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import MoodBadOutlinedIcon from '@mui/icons-material/MoodBadOutlined'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import NotInterestedRoundedIcon from '@mui/icons-material/NotInterestedRounded'
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined'
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined'
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined'
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export const MuiIconsList = {
  Add: AddRoundedIcon,
  Check: CheckRoundedIcon,
  Close: CloseRoundedIcon,
  AddCircle: AddCircleOutlinedIcon,
  TalkBox: ChatOutlinedIcon,
  Casino: CasinoOutlinedIcon,
  VideoDisplay: OndemandVideoOutlinedIcon,
  Stories: AutoStoriesOutlinedIcon,
  SmileFace: SentimentVerySatisfiedOutlinedIcon,
  BadMoodFace: MoodBadOutlinedIcon,
  HappyFace: SentimentSatisfiedOutlinedIcon,
  KeyArrowDown: KeyboardArrowDownRoundedIcon,
  KeyArrowRight: KeyboardArrowRightRoundedIcon,
  KeyArrowUp: KeyboardArrowUpRoundedIcon,
  KeyArrowLeft: KeyboardArrowLeftRoundedIcon,
  AddCircleOutlined: AddCircleOutlineIcon,
  ContentCopy: ContentCopyRoundedIcon,
  Disabled: NotInterestedRoundedIcon,
  FileUpload: FileUploadIcon,
  CheckedCheckBox: CheckBoxRoundedIcon,
  UncheckedCheckBox: CheckBoxOutlineBlankRoundedIcon,
  JoyFace: SentimentVerySatisfiedRoundedIcon,
  KeyArrowUpFill: ArrowDropUpRoundedIcon,
  KeyArrowDownFill: ArrowDropDownRoundedIcon,
  Refresh: ReplayRoundedIcon,
  SchoolHat: SchoolRoundedIcon,
  Bell: NotificationsNoneRoundedIcon,
  CheckCircleOutlined: CheckCircleOutlineRoundedIcon,
  CheckCircle: CheckCircleRoundedIcon,
  RemoveCircleOutlined: RemoveCircleOutlineOutlinedIcon,
  RemoveCircle: RemoveCircleOutlinedIcon,
  Sort: UnfoldMoreIcon,
  CompareArrow: CompareArrowsRoundedIcon,
  location: LocationOnOutlinedIcon,
  Window: WindowOutlinedIcon,
  Remove: RemoveOutlinedIcon,
  Circle: CircleIcon,
  Save: SaveRoundedIcon
}

export const MuiIcons: Record<string, OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>> = MuiIconsList

export const muiSize = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 48
}
