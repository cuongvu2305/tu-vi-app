import { BirthForm } from "@/components/tuvi/BirthForm";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-linear-to-b from-amber-50 to-white px-4 py-16 dark:from-black dark:to-zinc-950">
      <div className="flex w-full max-w-md flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Xem Tử Vi Trọn Đời
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Nhập ngày, giờ sinh dương lịch để lập lá số Tử Vi Đẩu Số và xem luận giải cơ bản 12
          cung.
        </p>
      </div>
      <div className="mt-8 w-full flex justify-center">
        <BirthForm />
      </div>
    </div>
  );
}
