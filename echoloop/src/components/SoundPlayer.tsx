"use client";

const sounds = [
  { name: "Rain", file: "/rain.mp3" },
  { name: "Ocean", file: "/ocean.mp3" },
  { name: "Forest", file: "/forest.mp3" },
  { name: "Wind", file: "/wind.mp3" },
  { name: "Night", file: "/night.mp3" },
];

export default function SoundPlayer() {
  // Audio playback is commented out until the matching sound files exist in `public/`.
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [currentSound, setCurrentSound] = useState<string | null>(null);
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className="panel-card sound-panel">
      <h2 className="text-lg font-bold">Ambient Sounds</h2>
      <p className="mb-4 text-sm text-gray-500">
        Sound playback is currently disabled because the audio files have not
        been added yet.
      </p>
      <div className="sound-grid">
        {sounds.map((sound) => (
          <div key={sound.name} className="sound-item">
            <button
              disabled
              className="sound-chip is-disabled"
            >
              Play {sound.name}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500">
        Expected files: {sounds.map((sound) => sound.file).join(", ")}
      </p>
    </div>
  );
}
