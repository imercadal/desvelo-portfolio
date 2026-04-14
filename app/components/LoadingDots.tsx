import styles from './loading-dots.module.css';

export default function LoadingDots() {
  return (
    <div className={styles.stage}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="ink-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={4} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={6} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className={styles.dotsContainer} style={{ filter: 'url(#ink-texture)' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles.dotWrapper}>
            <div className={styles.smudgeRing} />
            <div className={styles.smudgeBlob} />
            <div className={styles.dotCore} />
            <div className={`${styles.inkSpatter} ${styles.spatter1}`} />
            <div className={`${styles.inkSpatter} ${styles.spatter2}`} />
            <div className={`${styles.inkSpatter} ${styles.spatter3}`} />
            <div className={`${styles.inkSpatter} ${styles.spatter4}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
