import * as React from 'react'

import { Dialog, Divider } from '@mui/material'
import Slide from '@mui/material/Slide'
import { styled } from '@mui/material/styles'
import { TransitionProps } from '@mui/material/transitions'

import { TColors } from '../Colors/TColors'

type TPdvModal = {
  open: boolean
  title?: string
  fullScreen?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  headerColor?: TColors
  noContainerSpacing?: boolean
  noHeader?: boolean
  onClose?: () => void
}

type TPdvModalFooter = {
  Footer: React.FC<TFooter>
}

type TFooter = {
  className?: string
}

const CustomDialog = styled(Dialog)(() => ({
  '& .css-uhb5lp': { borderRadius: '1rem' },
  '& .css-1qmc5dd': { borderRadius: '1rem' },
  '& .css-18i3v7t': { borderRadius: '1rem' },
  '& .css-hppdow': { borderRadius: '1rem' },
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem' },
  '& .css-22jxwj-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem' },
  '& .css-12rl710-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem' },
  '& .css-1fu2e3p-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem' },
  '& .css-2rbg70-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem' }
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const PdvModal: React.FC<TPdvModal> & TPdvModalFooter = (props) => {
  const { headerColor = 'primary-color' } = props
  const fullScreenStyles = props.fullScreen ? '' : 'rounded-t-[1rem]'
  const modalPadding = props.noContainerSpacing ? '' : 'md:px-6 px-4 md:pt-6 pt-4'

  return (
    <CustomDialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth={props.size ?? 'sm'}
      fullScreen={props.fullScreen}
      sx={{ maxHeight: props.fullScreen ? '100vh' : '95vh', overflow: 'hidden' }}
      onClose={props.onClose}
    >
      {!props.noHeader && (
        <div className={`flex h-16 items-center px-4 py-3 md:px-6 ${fullScreenStyles}`} style={{ backgroundColor: `var(--${String(headerColor)})` }}>
          <h5 className="subtitle1 text-white">{props.title}</h5>
        </div>
      )}

      <div className={`no-mobile-scroll-bar h-full overflow-y-auto overflow-x-hidden ${modalPadding}`}>{props.children}</div>
    </CustomDialog>
  )
}

export const Footer: React.FC<TFooter> = (props) => {
  return (
    <div className="sticky bottom-0 w-full bg-white py-5">
      <Divider className="mb-4" />
      <div className={`${props.className}`}>{props.children}</div>
    </div>
  )
}

PdvModal.Footer = Footer

export default PdvModal
