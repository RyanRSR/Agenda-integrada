function InfoBox({ title, content }) {
  return (
    <section className="info-box-title">
      <h2>{title}</h2>
      <div className="info">{content}</div>
    </section>
  );
}

export default InfoBox;
