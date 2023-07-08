
export const FormContainer = ({ children }) => {
    return (
        <div className="h-fit flex w-full items-center justify-center md:mt-[200px] mt-[100px]">
          <div className='shadow-xl p-4 rounded-xl bg-bgGray md:w-2/5 w-4/5'>
            <div xs={12} md={6}>
              {children}
            </div>
          </div>
        </div>
    );
}
