import Image from "next/image";

export default function NotFound() {
  return (
    <div style={{marginTop: '60px'}}>
      <Image
        src="/images/404-img.jpg"
        alt="404"
        width={640}
        height={360}
        style={{ display: "block", margin: "auto" }}
      />
    </div>
  );
}
