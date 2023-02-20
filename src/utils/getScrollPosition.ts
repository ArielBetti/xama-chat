export type TGetScrollPosition = {
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
};

export const getScrollPosition = ({
  clientHeight,
  scrollHeight,
  scrollTop,
}: TGetScrollPosition) => ((scrollTop + clientHeight) / scrollHeight) * 100;
