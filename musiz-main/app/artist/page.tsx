'use client'

import { motion, useInView } from 'framer-motion'
import { memo, useRef, useState } from 'react'
import Slider from 'react-slick'
import Container from '../../components/Container'
import { ARTISTS, Artist } from '@/lib/data/artists'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const colour = (c: Artist['color']) =>
  c === 'purple'
    ? { b: 'border-purple-300', t: 'text-purple-600' }
    : c === 'cyan'
    ? { b: 'border-cyan-300', t: 'text-cyan-600' }
    : { b: 'border-amber-300', t: 'text-amber-600' }

const NavItem = memo(({ artist, active, onClick }: { artist: Artist; active: boolean; onClick: () => void }) => {
  const c = colour(artist.color)
  return (
    <motion.button
      whileHover={{ x: 8 }}
      onClick={onClick}
      className={`w-full p-3 sm:p-4 rounded-2xl flex gap-3 items-center transition ${
        active ? `border ${c.b} bg-white/70 shadow` : 'hover:bg-white/50 hover:shadow-sm'
      }`}
    >
      <span className="text-2xl sm:text-3xl">{artist.image}</span>
      <span>
        <span className={`block font-semibold text-sm sm:text-base ${active ? 'text-gradient' : 'text-black'}`}>
          {artist.name}
        </span>
        <span className="text-xs sm:text-sm text-neutral-600">{artist.genre}</span>
      </span>
    </motion.button>
  )
})
NavItem.displayName = 'NavItem'

const GridCard = memo(({ artist }: { artist: Artist }) => {
  const c = colour(artist.color)
  return (
    <div className={`rounded-3xl border ${c.b} bg-white/30 backdrop-blur p-5 sm:p-6 shadow-md`}>
      <div className="text-center">
        <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{artist.image}</div>
        <h3 className="font-bold text-base sm:text-lg">{artist.name}</h3>
        <p className={`${c.t} text-xs sm:text-sm mb-1 sm:mb-2`}>{artist.genre}</p>
        <div className="text-xs text-neutral-700">{artist.achievement}</div>
      </div>
    </div>
  )
})
GridCard.displayName = 'GridCard'

export default function ArtistsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  const current = ARTISTS[active] ?? ARTISTS[0]
  const show = { opacity: 1, y: 0 }
  const hide = { opacity: 0, y: 40 }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ],
    arrows: false
  }

  return (
    <section
      id="artists"
      ref={ref}
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-50"
    >
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-cyan-200/30 blur-3xl rounded-full top-10 left-10 animate-pulse opacity-40 -z-10"></div>

      <Container className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={hide}
          animate={inView ? show : hide}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 hover:drop-shadow-[0_1px_10px_rgba(0,200,255,0.4)] transition">
            Artist&nbsp;Portfolio
          </h2>
          <p className="mx-auto max-w-xl sm:max-w-3xl text-base sm:text-lg text-neutral-700">
            Discover talented creators who trust us with their vision.
          </p>
        </motion.div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 sm:mb-20 rounded-3xl border border-purple-300 bg-white/60 backdrop-blur p-6 sm:p-10 shadow-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            <div>
              <div className="text-5xl sm:text-7xl mb-3 sm:mb-4">{current.image}</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-black">{current.name}</h3>
              <p className="text-cyan-700 mb-2 sm:mb-3">{current.genre}</p>
              <p className="mb-3 sm:mb-4 text-neutral-700">{current.description}</p>
              <div className="inline-block bg-amber-200/60 rounded px-3 py-1 text-xs sm:text-sm mb-3 sm:mb-4">
                {current.achievement}
              </div>
              <blockquote className="italic text-neutral-600 text-sm">“{current.quote}”</blockquote>
            </div>
            <div className="space-y-3">
              {ARTISTS.map((a, i) => (
                <NavItem key={a.name} artist={a} active={i === active} onClick={() => setActive(i)} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <Slider {...settings}>
            {ARTISTS.map((artist) => (
              <div key={artist.name} className="px-2">
                <GridCard artist={artist} />
              </div>
            ))}
          </Slider>
        </motion.div>
      </Container>
    </section>
  )
}
