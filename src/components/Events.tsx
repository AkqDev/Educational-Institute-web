import { PhotoGallery } from "../components/PhotoGallery";

export default function Events() {
  return (
    <div className="bg-black md:py-24">
      <PhotoGallery animationDelay={0.3} />
    </div>
  );
}