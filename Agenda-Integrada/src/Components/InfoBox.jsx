function InfoBox({ title, content }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="info">{content}</div>
    </section>
  );
}

export default InfoBox;
