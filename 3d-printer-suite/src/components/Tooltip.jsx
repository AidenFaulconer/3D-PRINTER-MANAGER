import React, { useState, useRef, useEffect } from 'react'
import { HelpCircle } from 'lucide-react'

const Tooltip = ({ content, children, position = 'top', clickable = false }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [hasPosition, setHasPosition] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const previewRef = useRef(null)

  const updatePosition = (mouseX = null, mouseY = null) => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      
      // Use mouse position if provided, otherwise use trigger center
      const targetX = mouseX !== null ? mouseX : triggerRect.left + triggerRect.width / 2
      const targetY = mouseY !== null ? mouseY : triggerRect.top + triggerRect.height / 2

      let top, left

      switch (position) {
        case 'top':
          top = targetY - tooltipRect.height - 8
          left = targetX - tooltipRect.width / 2
          break
        case 'bottom':
          top = targetY + 8
          left = targetX - tooltipRect.width / 2
          break
        case 'left':
          top = targetY - tooltipRect.height / 2
          left = targetX - tooltipRect.width - 8
          break
        case 'right':
          top = targetY - tooltipRect.height / 2
          left = targetX + 8
          break
        default:
          top = targetY - tooltipRect.height - 8
          left = targetX - tooltipRect.width / 2
      }

      // Keep tooltip within viewport
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (left < 8) left = 8
      if (left + tooltipRect.width > viewportWidth - 8) {
        left = viewportWidth - tooltipRect.width - 8
      }
      if (top < 8) top = 8
      if (top + tooltipRect.height > viewportHeight - 8) {
        top = viewportHeight - tooltipRect.height - 8
      }

      setTooltipPosition({ top, left })
      setHasPosition(true)
    }
  }

  useEffect(() => {
    if (isVisible) {
      setHasPosition(false)
      updatePosition()
      const handleScroll = () => updatePosition()
      const handleResize = () => updatePosition()
      
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (clickable) {
      document.addEventListener('click', handleDocumentClick)
      return () => {
        document.removeEventListener('click', handleDocumentClick)
      }
    }
  }, [clickable, isClicked])

  const handleMouseEnter = (e) => {
    if (!isClicked) {
      setIsVisible(true)
    }
    // Show preview on hover
    setShowPreview(true)
  }

  const handleMouseMove = (e) => {
    // Track mouse position for precise tooltip positioning
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
      // Update position with mouse coordinates
      if (isVisible || isClicked) {
        updatePosition(e.clientX, e.clientY)
      }
    }
  }

  const handleMouseLeave = () => {
    if (!isClicked) {
      setIsVisible(false)
    }
    // Hide preview on mouse leave
    setShowPreview(false)
  }

  const handleClick = (e) => {
    if (clickable) {
      e.preventDefault()
      e.stopPropagation()
      if (isClicked) {
        setIsClicked(false)
        setIsVisible(false)
        setShowPreview(false)
      } else {
        setIsClicked(true)
        setIsVisible(true)
        setShowPreview(false)
      }
    }
  }

  const handleDocumentClick = (e) => {
    if (clickable && isClicked && triggerRef.current && !triggerRef.current.contains(e.target)) {
      setIsClicked(false)
      setIsVisible(false)
      setShowPreview(false)
    }
  }

  // Create preview content (first 60 characters)
  const previewContent = content && content.length > 60 ? content.substring(0, 60) + '...' : content

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`inline-block ${clickable ? 'cursor-pointer' : ''}`}
      >
        {children}
      </div>
      
      {/* Preview tooltip on hover - only show if not clicked and content is long enough */}
      {showPreview && !isClicked && !isVisible && content && content.length > 60 && (
        <div
          ref={previewRef}
          className="fixed z-40 px-2 py-1 text-xs text-white bg-gray-700 rounded shadow-lg max-w-xs whitespace-nowrap transition-all duration-150 ease-out"
          style={{
            top: mousePosition.y - 30,
            left: mousePosition.x,
            transform: 'translateX(-50%)',
          }}
        >
          {previewContent}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-700"></div>
        </div>
      )}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`fixed z-50 px-3 py-2 text-sm text-white rounded-lg shadow-lg max-w-xs transition-all duration-200 ease-out ${
            isClicked ? 'bg-blue-600 border border-blue-400' : 'bg-gray-900'
          }`}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            // Align transform based on desired side
            transform: (
              position === 'top' || position === 'bottom'
                ? 'translateX(-50%)'
                : position === 'left' || position === 'right'
                  ? 'translateY(-50%)'
                  : 'translateX(-50%)'
            ),
            opacity: hasPosition ? 1 : 0,
            pointerEvents: hasPosition ? 'auto' : 'none'
          }}
        >
          <div className="whitespace-pre-wrap">{content}</div>
          {/* Arrow - positioned to point to the exact mouse location */}
          <div
            className={`absolute w-2 h-2 transform rotate-45 ${
              isClicked ? 'bg-blue-600' : 'bg-gray-900'
            }`}
            style={{
              position: 'absolute',
              ...(position === 'top' ? {
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-2px)',
              } : position === 'bottom' ? {
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%) translateY(2px)',
              } : position === 'left' ? {
                left: '100%',
                top: '50%',
                transform: 'translateY(-50%) translateX(-2px)',
              } : {
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%) translateX(2px)',
              })
            }}
          />
        </div>
      )}
    </div>
  )
}

export const HelpTooltip = ({ content, className = '', clickable = true }) => {
  return (
    <Tooltip content={content} position="top" clickable={clickable}>
      <HelpCircle 
        className={`w-4 h-4 text-gray-400 hover:text-gray-600 ${clickable ? 'cursor-pointer' : 'cursor-help'} ${className}`}
      />
    </Tooltip>
  )
}

export default Tooltip
