const SubscriptionJobOfferItem = ({
  item,
  onSelect,
}: {
  item: any;
  onSelect?: () => void;
}) => {
  return <div onClick={onSelect}>JobOffer</div>;
};
export default SubscriptionJobOfferItem;
