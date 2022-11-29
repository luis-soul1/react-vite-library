import {
  AddCircleOutline,
  AddCircleOutlined,
  AddRounded,
  ArrowDropDownRounded,
  ArrowDropUpRounded,
  AutoStoriesOutlined,
  CasinoOutlined,
  ChatOutlined,
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
  CheckRounded,
  CloseRounded,
  ContentCopyRounded,
  FileUpload,
  KeyboardArrowDownRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  KeyboardArrowUpRounded,
  MoodBadOutlined,
  NotInterestedRounded,
  OndemandVideoOutlined,
  ReplayRounded,
  SchoolRounded,
  SentimentSatisfiedOutlined,
  SentimentVerySatisfiedOutlined,
  SentimentVerySatisfiedRounded
} from '@mui/icons-material'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export const MuiIconsList = {
  Add: AddRounded,
  Check: CheckRounded,
  Close: CloseRounded,
  AddCircle: AddCircleOutlined,
  TalkBox: ChatOutlined,
  Casino: CasinoOutlined,
  VideoDisplay: OndemandVideoOutlined,
  Stories: AutoStoriesOutlined,
  SmileFace: SentimentVerySatisfiedOutlined,
  BadMoodFace: MoodBadOutlined,
  HappyFace: SentimentSatisfiedOutlined,
  KeyArrowDown: KeyboardArrowDownRounded,
  KeyArrowRight: KeyboardArrowRightRounded,
  KeyArrowUp: KeyboardArrowUpRounded,
  KeyArrowLeft: KeyboardArrowLeftRounded,
  AddCircleOutlined: AddCircleOutline,
  ContentCopy: ContentCopyRounded,
  Disabled: NotInterestedRounded,
  FileUpload: FileUpload,
  CheckedCheckBox: CheckBoxRounded,
  UncheckedCheckBox: CheckBoxOutlineBlankRounded,
  JoyFace: SentimentVerySatisfiedRounded,
  KeyArrowUpFill: ArrowDropUpRounded,
  KeyArrowDownFill: ArrowDropDownRounded,
  Refresh: ReplayRounded,
  SchoolHat: SchoolRounded
}

export const MuiIcons: Record<string, OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>> = MuiIconsList

export const muiSize = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 48
}
