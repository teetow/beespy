import { SVGProps } from "react";
import Images from "../assets/images";

type Props = SVGProps<SVGSVGElement> & {
  image: keyof typeof Images;
};

const Image = ({ image, ...rest }: Props) => {
  const img = Images[image];

  return <svg {...{ ...img.head, ...rest }}>{img.body}</svg>;
};

export default Image;
