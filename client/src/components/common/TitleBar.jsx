import React, { useState } from 'react';

import { MdArrowBack } from 'react-icons/md';

export function TitleBar(props) {
  const [bcolor, setBcolor] = useState(props.backgroundColor || '#019f91');

  return <div>Back</div>;
}
