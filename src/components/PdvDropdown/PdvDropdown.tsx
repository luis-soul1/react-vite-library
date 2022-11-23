import { useState, useRef, PropsWithChildren, cloneElement, Children } from 'react'

import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'

import { TColors } from '../Colors/TColors'
import { PdvIcon } from '../Icons/PdvIcon'
import PdvButton, { TButtonSize, TButtonVariant } from '../PdvButton'

type TPdvDropdown = {
  title: string
  className?: string
  variant?: TButtonVariant
  color?: TColors
  size?: TButtonSize
  children: React.ReactElement<TItem>[] | React.ReactElement<TItem>
  rounded?: 'none' | 'small' | 'medium' | 'large' | 'full'
  onClick?: () => void
}
type TDropdownItems = {
  Item: React.FC<TItem>
}

export const PdvDropdown: React.FC<TPdvDropdown> & TDropdownItems = (props) => {
  const { rounded = 'medium', variant = 'contained', color = 'primary-color' } = props
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  const setRounded = () => {
    const dispatch = {
      none: { left: 'rounded-none', right: 'rounded-none' },
      small: { left: 'rounded-l-sm rounded-r-none', right: 'rounded-l-none rounded-r-sm' },
      medium: { left: 'rounded-l-md rounded-r-none', right: 'rounded-l-none rounded-r-md' },
      large: { left: 'rounded-l-lg rounded-r-none', right: 'rounded-l-none rounded-r-lg' },
      full: { left: 'rounded-l-full rounded-r-none', right: 'rounded-l-none rounded-r-full' }
    }
    return dispatch[rounded]
  }

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        className="min-h-[24px] gap-0.5 rounded-none shadow-gray-500/50"
        style={{ boxShadow: 'var( --shadow-gray--016)' }}
      >
        <PdvButton
          className={`h-full shadow-none ${setRounded().left}  ${props.className}`}
          color={color}
          variant={variant}
          size={props?.size}
          onClick={handleToggle}
        >
          {props.title}
        </PdvButton>
        <PdvButton
          className={`h-full px-2 shadow-none ${setRounded().right}  ${props.className}`}
          color={color}
          variant={variant}
          size={props?.size}
          onClick={handleToggle}
        >
          <PdvIcon name="KeyArrowDownFill" color={variant !== 'contained' ? color : 'white'} />
        </PdvButton>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className="z-50">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper sx={{ '.MuiMenu-list': { padding: 0 } }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem sx={{ padding: 0, marginTop: 1 }}>
                  {props.children &&
                    Children.map(props.children, (child) => {
                      const item = child as React.ReactElement<PropsWithChildren<TItem>>
                      if (item.type === Item) {
                        const onClick = () => {
                          setOpen(false)
                          item.props.onClick?.()
                        }
                        return cloneElement(item, { onClick })
                      }
                    })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

type TItem = {
  children: React.ReactNode
  disabled?: boolean
  onClick: () => void
}
const Item: React.FC<TItem> = (props) => {
  return (
    <MenuItem disabled={props.disabled} onClick={props.onClick} className="body1">
      {props.children}
    </MenuItem>
  )
}
PdvDropdown.Item = Item
export default PdvDropdown
