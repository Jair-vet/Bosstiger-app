import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const AdminDropdown = ({title}) => {
    
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
          await logoutApiCall().unwrap();
          dispatch(logout());
          navigate('/login');
        } catch (err) {
          console.error(err);
        }
    };
    function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

  return (
    <Menu as="div" className="relative inline-block md:text-left text-center">
        <div>
        <Menu.Button className="inline-flex w-full justify-center px-3 py-2 text-xl uppercase font-semibold shadow-sm">
            { title }
            <ChevronDownIcon className="-mr-3 h-6 w-8" aria-hidden="true" />
        </Menu.Button>
        </div>

        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
        <Menu.Items className="md:absolute md:right-0 md:z-10 w-56 origin-top-right rounded-md bg-bgColor shadow-lg">
            <div className="py-1 hover:text-lightColor">
                <Menu.Item>
                    {({ active }) => (
                    <Link
                        to="/admin/productlist"
                        className={classNames(
                        active ? 'text-primaryColor' : 'text-secondaryColor ',
                            'block px-4 py-2 text-sm uppercase hover:text-lightColor'
                        )}
                    >
                        Products
                    </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                    <Link
                        to="/admin/userlist"
                        className={classNames(
                        active ? 'text-primaryColor' : 'text-secondaryColor ',
                            'block px-4 py-2 text-sm uppercase hover:text-lightColor'
                        )}
                    >
                        Users
                    </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                    <Link
                        to="/admin/orderlist"
                        className={classNames(
                        active ? 'text-primaryColor' : 'text-secondaryColor ',
                            'block px-4 py-2 text-sm uppercase hover:text-lightColor'
                        )}
                    >
                        Orders
                    </Link>
                    )}
                </Menu.Item>
            </div>
        </Menu.Items>
        </Transition>
    </Menu>
  )
}
