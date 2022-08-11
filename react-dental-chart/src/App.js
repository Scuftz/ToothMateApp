import WholeMouth from './components/WholeMouth';

export default function App() {
  return (
    <div className='container'>
      <WholeMouth />
      <div
        style={{
          marginBottom: 105 /* temp fix until I figure out a way to accurately represent 100vh on mobile */,
        }}
      >
        <p>
          Tap and drag to interact with the mouth. Tap a tooth to view further
          details.
        </p>
      </div>
    </div>
  );
}
