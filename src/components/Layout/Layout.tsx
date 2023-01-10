import { createSignal, For, ParentComponent, Show } from "solid-js";
import { Dialog, DialogPanel } from "solid-headless";
import { HiOutlineMenu, HiOutlineX } from "solid-icons/hi";
import {
  IoHammerOutline,
  IoPeopleOutline,
  IoListOutline,
} from "solid-icons/io";

import { classNames } from "@utils/commonHelpers";
import { Motion, Presence } from "@motionone/solid";
import NavLinkWrapper from "@components/NavLinkWrapper";
import { A } from "@solidjs/router";

const navigation = [
  { name: "Deckbuilding", href: "/deck", icon: IoHammerOutline },
  { name: "My Roster", href: "/roster", icon: IoPeopleOutline },
  {
    name: "Saved Decks",
    href: "/decklist",
    icon: IoListOutline,
  },
  // { name: "Calendar", href: "#", icon: HiOutlineCalendar },
  // { name: "Documents", href: "#", icon: HiOutlineInbox },
  // { name: "Reports", href: "#", icon: HiOutlineChartBar },
];

const Layout: ParentComponent = (props) => {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);

  return (
    <>
      <Dialog
        isOpen={sidebarOpen()}
        class="relative z-40 md:hidden"
        onClose={() => setSidebarOpen(false)}
      >
        <Presence>
          <Show when={sidebarOpen()}>
            <Motion.span
              class="inline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Motion.span>
          </Show>
        </Presence>
        <div class="fixed inset-0 z-40 flex">
          <Presence>
            <Show when={sidebarOpen()}>
              <Motion.span
                class="h-full w-full"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ easing: "ease-in-out", duration: 0.3 }}
                exit={{ x: "-100%" }}
              >
                <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 h-full">
                  <Motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ easing: "ease-in-out", duration: 0.3 }}
                  >
                    <div class="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span class="sr-only">Close sidebar</span>
                        <HiOutlineX
                          class="h-6 w-6 stroke-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Motion.span>

                  <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div class="flex flex-shrink-0 items-center px-4">
                      SuBa 2023 Deckbuilder
                    </div>
                    <nav class="mt-5 space-y-1 px-2">
                      <For each={navigation}>
                        {(item) => (
                          <NavLinkWrapper
                            end
                            href={item.href}
                            activeClass={"bg-gray-900 text-white"}
                            inactiveClass="text-gray-300 hover:bg-gray-700 hover:text-white"
                            class={
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            }
                          >
                            {(isActive) => (
                              <>
                                <item.icon
                                  class={classNames(
                                    isActive
                                      ? "text-gray-300"
                                      : "text-gray-400 group-hover:text-gray-300",
                                    "mr-4 flex-shrink-0 h-6 w-6"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </>
                            )}
                          </NavLinkWrapper>
                        )}
                      </For>
                    </nav>
                  </div>
                  <div class="flex flex-shrink-0 bg-gray-600 p-4">
                    <a href="#" class="group block flex-shrink-0">
                      <div class="flex items-center">
                        <div>
                          <img
                            class="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div class="ml-3">
                          <p class="text-base font-medium text-white">
                            Tom Cook
                          </p>
                          <p class="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </DialogPanel>
              </Motion.span>
            </Show>
          </Presence>
          <div class="w-14 flex-shrink-0">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div class="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div class="flex flex-shrink-0 items-center px-4 text-white font-bold">
              Baseball Superstars Deckbuilder
            </div>
            <nav class="mt-5 flex-1 space-y-1 px-2">
              <For each={navigation}>
                {(item) => (
                  <NavLinkWrapper
                    end
                    href={item.href}
                    activeClass={"bg-gray-900 text-white"}
                    inactiveClass="text-gray-300 hover:bg-gray-700 hover:text-white"
                    class={
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    }
                  >
                    {(isActive) => (
                      <>
                        <item.icon
                          class={classNames(
                            isActive
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </>
                    )}
                  </NavLinkWrapper>
                )}
              </For>
            </nav>
          </div>
          <div class="flex flex-shrink-0 bg-gray-600 p-4">
            <A href="/profile" class="group block w-full flex-shrink-0">
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-white">Tom Cook</p>
                  <p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                    View profile
                  </p>
                </div>
              </div>
            </A>
          </div>
        </div>
      </div>
      <div class="flex flex-1 flex-col md:pl-64">
        <div class="sticky top-0 z-10 bg-gray-700 px-1 pt-1 sm:pl-3 sm:pt-3 md:hidden justify-between flex">
          <button
            type="button"
            class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span class="sr-only">Open sidebar</span>
            <HiOutlineMenu class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main class="flex-1 flex overflow-hidden">{props.children}</main>
      </div>
      <div class="md:flex absolute right-1 top-1 hidden" />
    </>
  );
};

export default Layout;
