
export const FormContainer = ({ children }) => {
    return (
        <div className="h-screen flex w-full items-center justify-center">
          <div className='shadow-xl p-4 rounded-xl bg-bgGray  w-2/5'>
            <div xs={12} md={6}>
              {children}
            </div>
          </div>
        </div>
    );
}
