import React from 'react'
import CasaIcon from './CasaIcon'

const icon = (
  <svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink'>
    <title>Group 7</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <path d='M20,24 L4,24 C1.8,24 0,22.2 0,20 L0,4 C0,1.8 1.8,0 4,0 L20,0 C22.2,0 24,1.8 24,4 L24,20 C24,22.2 22.2,24 20,24' id='task-green' />
    </defs>
    <g id='Account' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g id='Icons' transform='translate(-313.000000, -299.000000)'>
        <g id='Group-7' transform='translate(313.000000, 299.000000)'>
          <g id='Group-5'>
            <g id='_casa-/-icons-/-timeline-/-cases-copy-3'>
              <g id='cases'>
                <g id='bg/icon/default'>
                  <mask id='mask-2' fill='white'>
                    <use xlinkHref='#task-green' />
                  </mask>
                  <use id='Mask' fill='#231F20' xlinkHref='#task-green' />
                  <g id='_telusGE/bg/icon/secondary' mask='url(#mask-2)' fill='#248700'>
                    <rect id='bg-icon' x='0' y='0' width='32' height='32' />
                  </g>
                </g>
              </g>
            </g>
            <g id='Group-2' transform='translate(5.000000, 1.000000)'>
              <g id='Group' transform='translate(0.000000, 0.663412)'>
                <path d='M13,2.66341154 C13.5522847,2.66341154 14,3.11112679 14,3.66341154 L14,18.6634115 C14,19.2156963 13.5522847,19.6634115 13,19.6634115 L1,19.6634115 C0.44771525,19.6634115 6.76353751e-17,19.2156963 0,18.6634115 L0,3.66341154 C-6.76353751e-17,3.11112679 0.44771525,2.66341154 1,2.66341154 L3.23076923,2.66341154 L3.23076923,3.66341154 C3.23076923,4.21569629 3.67848448,4.66341154 4.23076923,4.66341154 L4.23076923,4.66341154 L9.76923077,4.66341154 C10.3215155,4.66341154 10.7692308,4.21569629 10.7692308,3.66341154 L10.7692308,3.66341154 L10.7692308,2.66341154 L10.7692308,2.66341154 L13,2.66341154 Z' id='Combined-Shape' stroke='#FFFFFF' />
                <path d='M4.86094814,1.26978394 C5.07449342,1.26359119 5.25816274,1.25114551 5.41195611,1.23244692 C6.10180689,1.1485731 6.34199289,0.663411539 7.1035637,0.663411539 C7.86513451,0.663411539 8.13128445,1.08464614 8.59547467,1.23244692 C8.72032374,1.27219957 8.91274068,1.29591434 9.1727255,1.30359126 C10.0619724,1.32984411 10.7692308,2.05829488 10.7692308,2.94792923 L10.7692308,3.66341154 C10.7692308,4.21569629 10.3215155,4.66341154 9.76923077,4.66341154 L4.23076923,4.66341154 C3.67848448,4.66341154 3.23076923,4.21569629 3.23076923,3.66341154 L3.23076923,2.94792923 C3.23076923,2.03968011 3.95308087,1.29611796 4.86094814,1.26978394 Z' id='Rectangle' stroke='#FFFFFF' />
                <line x1='11.3076923' y1='13.1634115' x2='11.3076923' y2='13.1634115' id='Line-9' stroke='#979797' strokeLinecap='square' />
                <ellipse id='Oval' fill='#FFFFFF' cx='2.69230769' cy='8.16341154' rx='1' ry='1' />
                <line x1='4.84615385' y1='8.16341154' x2='11.3076923' y2='8.16341154' id='Line-8' stroke='#FFFFFF' strokeLinecap='round' />
                <ellipse id='Oval' fill='#FFFFFF' cx='2.69230769' cy='11.1634115' rx='1' ry='1' />
                <line x1='4.84615385' y1='11.1634115' x2='11.3076923' y2='11.1634115' id='Line-8' stroke='#FFFFFF' strokeLinecap='round' />
                <ellipse id='Oval' fill='#FFFFFF' cx='2.69230769' cy='14.1634115' rx='1' ry='1' />
                <line x1='4.84615385' y1='14.1634115' x2='11.3076923' y2='14.1634115' id='Line-8' stroke='#FFFFFF' strokeLinecap='round' />
                <ellipse id='Oval' fill='#FFFFFF' cx='2.69230769' cy='17.1634115' rx='1' ry='1' />
                <line x1='4.84615385' y1='17.1634115' x2='8.07692308' y2='17.1634115' id='Line-8' stroke='#FFFFFF' strokeLinecap='round' />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const TaskGreen = (props) => {
  return React.createElement(CasaIcon, props, icon)
}
export default TaskGreen
