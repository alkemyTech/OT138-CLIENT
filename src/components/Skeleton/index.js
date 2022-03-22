import React, { useState } from 'react';
import { Avatar } from "../Inputs/styles";
import Skeleton from 'react-loading-skeleton';

export function AvatarSkeleton() {
  return (<Skeleton circle={true} width="45px" height="45px" />)
}

export function AvatarWithSkeleton(props) {
  const [loaded, setLoaded] = useState(false)
  return (<>
    <Avatar {...props} onLoad={() => setLoaded(true)} style={loaded ? {} : { display: "none" }} />
    {!loaded && <AvatarSkeleton />}
  </>)
}