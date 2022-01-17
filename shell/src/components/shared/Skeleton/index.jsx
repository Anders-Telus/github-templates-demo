import React from 'react'
import PropTypes from 'prop-types'
import SkeletonProvider from '@tds/community-skeleton-provider'
import Image from '@tds/core-image'
import Text from '@tds/core-text'

const Skeleton = ({
  type,
  radius,
  lines,
  characters,
  isFetching
}) => {
  const CircleTemplate = (
    <Image
      src=''
      rounded='circle'
      width={radius * 2}
      height={radius * 2}
      alt='circle_skeleton'
      skeleton
    />
  )

  const TextTemplate = (
    <Text skeleton={{ lines, characters }}>{' '}</Text>
  )

  switch (type) {
    case 'text': return (
      <SkeletonProvider show={isFetching}>{TextTemplate}</SkeletonProvider>
    )
    case 'circle': return (
      <SkeletonProvider show={isFetching}>{CircleTemplate}</SkeletonProvider>
    )
    default: return null
  }
}

Skeleton.defaultProps = {
  isFetching: true,
  radius: 0,
  lines: 0,
  characters: 0
}

Skeleton.propTypes = {
  isFetching: PropTypes.bool,
  type: PropTypes.string.isRequired,
  radius: PropTypes.number,
  lines: PropTypes.number,
  characters: PropTypes.number
}

export default Skeleton
