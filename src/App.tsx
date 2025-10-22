import { useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Hello World</h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <Button onClick={() => setCount(count + 1)}>Click me</Button>
        <p>Count: {count}</p>
        <Button onClick={() => setCount(count - 1)}>Click me</Button>
      </div>
    </div>
  );
}

export default App;
