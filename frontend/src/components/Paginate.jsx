import { Link } from "react-router-dom"

export const Paginate = ({ pages, page, isAdmin = false }) => {
  return (
    <div className="flex justify-center h-fit items-center mt-[50px]">
        <nav className="">
            {pages > 1 && (
                <ul className="inline-flex -space-x-px items-center">
                    { [...Array(pages).keys()].map((x) => (
                        <li key={x + 1}>
                            <Link to={
                                !isAdmin
                                    ? `/page/${x + 1}`
                                    : `/admin/productlist/${x + 1}`
                                }
                                className={
                                    page === x+1 
                                    ? `mr-2 px-6 py-5 leading-tight text-lightColor rounded-md hover:bg-gray100 hover:text-lightColor dark:bg-primaryColor
                                        dark:border-gray300  dark:text-gray400 dark:hover:bg-primaryColor 
                                        dark:hover:text-lightColor`

                                    : `mr-2 px-6 py-5 leading-tight text-lightColor rounded-md hover:bg-gray100 hover:text-gray700 dark:bg-gray800
                                        dark:border-gray300  dark:text-gray400 dark:hover:bg-gray700 
                                        dark:hover:text-lightColor`

                                }
                                
                                >
                                <span className="text-lightColor text-xl">{x + 1}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    </div>
  )
}
