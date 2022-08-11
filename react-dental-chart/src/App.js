import WholeMouth from './WholeMouth';

export default function App() {
  return (
    <div className='container'>
      <WholeMouth />
      <div style={{ marginBottom: 20 }}>
        <p>
          Tap and drag to interact with the mouth. Tap a tooth to view further
          details.
        </p>
      </div>
    </div>
  );
}
