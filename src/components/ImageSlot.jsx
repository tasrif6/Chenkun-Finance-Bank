// Renders the image if `src` is set; otherwise a labelled placeholder so layout/animations still work.
export default function ImageSlot({ src, alt, label }) {
  if (src) return <img className="art" src={src} alt={alt} />;
  return (
    <div className="slot" role="img" aria-label={label}>
      <span>{label}<small>Set the path in src/constants/content.js</small></span>
    </div>
  );
}
