export interface SingleGameProps {
  bannerUrl: string;
  title: string;
  description: string;
  categories: string;
  platforms: string;
}

export function SingleGameAd(props: SingleGameProps) {
  const categories = props.categories?.split(",");

  return (
    <div className="flex gap-10 flex-col mx-4 md:flex-row md:gap-20">
      <div className="flex flex-col items-center animate-[fade-in-left_0.5s_ease-in-out_both]">
        <img
          className="w-full object-cover rounded-3xl md:w-80 xl:rounded-lg xl:shadow-lg"
          src={props.bannerUrl}
          alt=""
        />
        <div className="flex gap-8 mt-2">
          {categories?.map((category) => {
            return (
              <span
                key={category}
                className="px-2 py-1 h-fit bg-slate-800 text-white rounded-md text-sm text-center 
                  animate-fade-in-forward hover:bg-slate-700/90 transition-colors"
              >
                {category}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col text-white tracking-tight animate-fade-in-forward">
        <div className="flex place-items-center justify-center mb-6">
          <h1 className="font-semibold text-3xl md:text-5xl">{props.title}</h1>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm md:text-md">{props.description}</span>
          <span className="text-xs font-semibold text-gray-400 md:text-sm">
            Plataformas: {props.platforms}
          </span>
        </div>
      </div>
    </div>
  );
}
