import * as React from 'react';
import Badge from '@mui/material/Badge';
import CardGiftcardTwoTone from '@mui/icons-material/CardGiftcardTwoTone';

export default function SimpleBadge(pops) {
  const latestData = JSON.parse(localStorage.getItem("releaseProducts")) || [];
  let totalCount = 0;
  for (const item of latestData) {
    totalCount += item.numberOfProducts;
  }
  const [checked, setChecked] = React.useState(false);
  
  React.useEffect(() => {
    setChecked(true)
    setTimeout(() => {
      setChecked(false);
    }, 500);
  }, [pops.count])

  return (
    <Badge badgeContent={pops.count ? pops.count : totalCount} color="primary" invisible={checked}>
      <CardGiftcardTwoTone color="white" />
    </Badge>
  );
}