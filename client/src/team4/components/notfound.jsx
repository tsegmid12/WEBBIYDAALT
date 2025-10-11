// src/pages/NotFound.jsx
const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div>
        <span className='textGreen text-8xl font-bold mb-4'>4</span>
        <span className='text-8xl font-bold mb-4'>0</span>
        <span className='textGreen text-8xl font-bold mb-4'>4</span>
      </div>

      <p className='text-xl mb-2'>Өө... Энэ хуудас олдсонгүй</p>
      <p className='text-center text-sm text-gray-500 mb-8'>
        Уучлаарай, таны нээх гэж буй хуудас олдсонгүй.
        <br />
        Таны оруулсан URL зөв эсэхийг шалгана уу
      </p>
      <a
        href='/team4'
        className='px-6 py-2 bgGreen  text-white rounded hover:bg-blue-600 transition'>
        Нүүр хуудас
      </a>
    </div>
  );
};

export default NotFound;
