export default function Home() {
  return (
    <div>
      <section className="px-4 h-[calc(90dvh)] flex flex-col text-center justify-center items-center">
        <h1
          className="text-9xl font-bold my-6"
          style={{ 
            backgroundImage: 'linear-gradient(to right, var(--synbio-green), var(--natural-green))',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Synbio ID
        </h1>
        <p className="text-lg">
          A Non-profit Organization that Focus on Enhancing Synthetic Biology and <br />
          Bioinformatics Enthusiasts in Indonesia. We are Ready to Make Any <br />
          Collaborations with Your Institution.
        </p>
      </section>

      <div
        className="relative h-[200px]"
        style={{
          backgroundImage: "linear-gradient(to right, var(--synbio-green), var(--natural-green), transparent), url('/images/images.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-1/2 transform -translate-y-1/2 text-white pl-4 pr-64">
          <h2>Welcome to My Website</h2>
          <p>This is a container with a gradient background that transitions to an image.</p>
        </div>
      </div>
    </div>
  );
}
