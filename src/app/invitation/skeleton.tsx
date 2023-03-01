const Skeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <div className="gap-5 w-ful flex flex-col w-full max-w-xl items-center justify-center">
        <div className="max-w-md bg-zinc-800 w-full animate-pulse h-10 rounded-md" />
        <div className="max-w-md bg-zinc-800 w-full animate-pulse h-5 rounded-md" />
        <div className="max-w-md bg-zinc-800 w-full animate-pulse h-5 rounded-md" />
        <div className="max-w-sm bg-zinc-800 w-full animate-pulse h-5 rounded-md" />
        <div className="max-w-xs bg-zinc-800 w-full animate-pulse h-10 rounded-md" />
      </div>
    </div>
  );
};

export default Skeleton;
