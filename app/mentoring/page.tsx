import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="banner">
        <h1 className="font-bold">Mentoring Program</h1>
        <p>Gathering mentors and mentees across Indonesia to explore life science</p>
      </section>

      <div className="p-4 flex flex-col gap-6">
        <div className="flex gap-2 h-[calc(3/5*100dvh)]">
          <div className="h-full w-full relative">
            <Image 
              src="/images/mentoring/mascot.png"
              alt="Mascot"
              layout="fill"
              objectFit="cover"
              className="h-full w-full"
            />
          </div>
          <p>
            Synbio.ID's Mentoring Program seeks and matches experts 
            from various life science backgrounds to share their 
            knowledge and insights with 1-3 mentees to help them 
            pursue their careers and passions.
          </p>
        </div>

        <div className="flex items-center">
          <div className="w-2/3">
            <h2>First Batch Synbio ID Mentoring</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna 
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="w-1/3 flex flex-col text-center">
            <p className="text-xl font-medium">96 Mentors</p>
            <p>&</p>
            <p className="text-xl font-medium">176 Mentees</p>
          </div>
        </div>
        

        <div>
          <h2>Testimony</h2>
          <div className="flex gap-4">
            <div className="box">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            <div className="box">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            <div className="box">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
          </div>
        </div>

        <div className="ml-52 text-right">
          <h2>First Batch Synbio ID Mentoring</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
}
