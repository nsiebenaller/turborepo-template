import { Button } from "ui";
import Image from "next/image";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Button />
      <Image
        src={"https://apidev.agrograph.com/client/moody/field-image?id=example"}
        alt="Example Moody Image"
        width="400"
        height="400"
      />
    </div>
  );
}
