import Link from 'next/link';
import React from 'react';
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="banner">
        <h1 className="font-bold">Mentoring Program</h1>
        <p className="text-lg italic text-center">Gathering mentors and mentees across Indonesia to explore life science</p>
      </section>

      <div className="px-10 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          {/* <Link href="/mentoring"> */}
            <p>Mentoring Home</p>
          {/* </Link> */}
        </div>

        <div className="flex justify-end items-center gap-4">
          <Link href="/mentoring/join">
            <p className="font-medium hover:scale-110" style={{ color: 'var(--synbio-green)' }}>
              Join as Mentor✨
            </p>
          </Link>

          <Link href="/mentoring/login">
            <button className="login" type="button">Login</button>
          </Link>
        </div>
      </div>

      <div className="page flex flex-col gap-10">
        <div className="flex gap-2 items-center justify-center">
          <Image 
            src="/images/mentoring/mascot.png"
            alt="Mascot"
            width={1007}
            height={1149}
            className="w-auto h-40"
          />
          <div className="max-w-[675px]">
            <p>
              <b>Welcome to SynBio ID&apos;s Mentoring Program! </b> 
              where the future of life sciences takes shape. Whether 
              you&apos;re a student, researcher, or professional, our platform 
              connects you with experts across the synthetic biology field.
            </p>

            <div className="flex gap-2 mt-2">
              <Link href="/mentoring/book">
                <button type="button">Book Mentor</button>
              </Link>
              <Link href="/mentoring/documentation">
                <button type="button">Documentation</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="page my-8 flex flex-col gap-10 overflow-x-hidden">
        <div className="-mx-40 p-40 py-4" style={{ background: 'var(--light-green)' }}>
          <p className="text-left mr-36">
            <b>Book a mentoring session</b> with top scientists and industry leaders to accelerate your learning 
            and career.
            With <b>personalized guidance</b> and opportunities to network, 
            you&apos;ll have the support to navigate complex concepts and innovations in life sciences.
          </p>

          <p className="text-right ml-50 mt-4">
            <b>Start your journey today</b>—connect with mentors, gain insights, and 
            unlock new possibilities in synthetic biology!
          </p>
        </div>

        <div>
          <h2>Unlock the Future of Life Sciences with Personalized Mentoring</h2>
          <p className="mt-4">
            Meet our most anticipated program: Synbio ID&apos;s Mentoring—where 
            life science enthusiasts and professionals can connect with experts from 
            around the world. Whether you&apos;re navigating your academic journey, exploring 
            synthetic biology, or looking to advance your career, our platform makes it 
            easy to book one-on-one mentoring sessions with leading experts in the field.
          </p>
          <p className="mt-4">
            Explore diverse perspectives, gain valuable insights, and accelerate your 
            growth with tailored guidance. Start your journey by booking a session today, 
            and take your next step towards innovation and discovery in life sciences.
          </p>
        </div>

        <div>
          <h2>Mentor Categories</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/school-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Academia</p>
                <p>The mentor works within the academic field (Example: researchers, lecturers, etc.)</p>
              </div>
            </div>

            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/company-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Company</p>
                <p>The mentor works within a life science-related company.</p>
              </div>
            </div>

            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/startup-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Start-Up</p>
                <p>The mentor works within a life science-related start-up.</p>
              </div>
            </div>

            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/bank-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Government</p>
                <p>The mentor works for a government agency or body (Example: Badan Riset dan Inovasi Nasional or BRIN).</p>
              </div>
            </div>

            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/school-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Indonesian Student Abroad</p>
                <p>The mentor is an Indonesian student majoring in life sciences who is currently or has ever studied abroad.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-center">Testimony from Previous Batch</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="box flex-1 min-w-96">
              <p className="text-justify">
                Terima kasih atas bimbingan dan sarannya yang sangat membangun. Saran-saran yang diberikan juga di luar dari apa yang saya pikirkan. Terima kasih juga telah bersedia memberikan networking yang memungkinkan untuk menunjang karir saya kedepannya. Saya sangat berharap bisa mendapat semacam rekomendasi dari mentor untuk bisa mencoba workshop atau intern di perusahaan tertentu pada posisi yang diminati untuk mendapatkan skill yang lebih praktis.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Michael Nathanael D.</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>
            
            <div className="box flex-1 min-w-96">
              <p className="text-justify">
                Her insights into the company and its inner workings have been invaluable, giving me a clearer understanding of the industry. The information she shared about opportunities to learn drug discovery abroad has opened my eyes to new possibilities and has been truly inspiring. Her guidance and support have significantly shaped my professional aspirations, and I am deeply appreciative of the time and effort she has invested in helping me grow.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Prettish Kishore R.</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>

            <div className="box flex-1 min-w-96">
              <p className="text-justify">
                Kegiatan ini sudah sangat baik, mulai dari pencocokan Mentee-tutor yang tepat. Tutor juga dapat lebih memahami kebutuhan dan minat mentee, sehingga tutor dapat memberikan saran dalam pengembangan keterampilan teknis dan non teknis yang dibutuhkan oleh mentee Struktur program yg jelas dan disediakan evaluasi dan umpan balik setiap sesinya. Terimakasih juga kepada Synbio yang sudah memfasilitasi kegiatan ini. (Saya tidak memiliki saran☺). Semoga kegiatan seperti ini terus berlanjut, dan kami di daerah bisa berkesempatan ikut kegiatan Synbio ID selanjutnya.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Suwarny</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>

            <div className="box flex-1 min-w-96">
              <p className="text-justify">
                Saya mendapat banyak insight yang sangat helpful utamanya dalam menentukan arah karir saya. Pembicaraan selama mentoring berjalan dengan lancar dan sesuai dengan yang saya harapkan. Pengalaman dan cerita kakak mentor sangat inspiratif dan berhasil seperti &quot;membangunkan&quot; diri saya. Saya juga menerima saran dan masukan serta rekomendasi hal-hal yang perlu lebih saya perhatikan dalam mencapai karir impian saya.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Sylvia Fathin</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>

            <div className="box flex-1 min-w-96">
              <p className="text-justify">
                Pengalaman mentoring saya sangat menyenangkan dan insightful. Saya mendapatkan banyak insight baru mengenai karir di life sciences, mendapatkan saran dan semangat mengenai rencana & tujuan saya, dan membantu merencanakan langkah nyata untuk mencapai tujuan.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Kanaya Salsabilla</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
