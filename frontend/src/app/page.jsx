import { Suspense } from "react";

//internal import
import Banner from "@components/banner/Banner";
import CardTwo from "@components/cta-card/CardTwo";
import OfferCard from "@components/offer/OfferCard";
import StickyCart from "@components/cart/StickyCart";
import ProductCard from "@components/product/ProductCard";
import MainCarousel from "@components/carousel/MainCarousel";
import CMSkeletonTwo from "@components/preloader/CMSkeleton";
import FeatureCategory from "@components/category/FeatureCategory";
import { getShowingStoreProducts } from "@services/ProductServices";
import { getShowingAttributes } from "@services/AttributeServices";
import {
  getGlobalSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";
import DiscountedCard from "@components/product/DiscountedCard";

const Home = async () => {
  const { attributes } = await getShowingAttributes();
  const { storeCustomizationSetting, error: storeCustomizationError } =
    await getStoreCustomizationSetting();
  const { popularProducts, discountedProducts, error } =
    await getShowingStoreProducts({
      category: "",
      title: "",
    });

  const { globalSetting } = await getGlobalSetting();
  const currency = globalSetting?.default_currency || "$";

  // console.log("storeCustomizationSetting", storeCustomizationSetting);

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      {/* sticky cart section */}
      <StickyCart currency={currency} />

      <div className="bg-white dark:bg-zinc-900">
        <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
          <div className="flex w-full">
            {/* Home page main carousel */}
            <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
              <Suspense fallback={<p>Loading carousel...</p>}>
                <MainCarousel />
              </Suspense>
            </div>
            {/* Coupon Offer Card */}
            <div className="w-full hidden lg:flex ">
              <Suspense fallback={<p>Loading coupons...</p>}>
                <OfferCard />
              </Suspense>
            </div>
          </div>

          {/* Banner */}
          <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 dark:bg-slate-600">
            <Banner storeCustomizationSetting={storeCustomizationSetting} />
          </div>
        </div>
      </div>

      {/* feature category's */}
      {storeCustomizationSetting?.home?.featured_status && (
        <div className="bg-gray-100 dark:bg-zinc-800 lg:py-16 py-10">
          <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-semibold">
                  <CMSkeletonTwo
                    count={1}
                    height={30}
                    loading={false}
                    error={storeCustomizationError}
                    data={storeCustomizationSetting?.home?.feature_title}
                  />
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-6">
                  <CMSkeletonTwo
                    count={4}
                    height={10}
                    loading={false}
                    error={storeCustomizationError}
                    data={storeCustomizationSetting?.home?.feature_description}
                  />
                </p>
              </div>
            </div>

            <Suspense fallback={<p>Loading feature category...</p>}>
              <FeatureCategory />
            </Suspense>
          </div>
        </div>
      )}

      {/* popular products */}
      {storeCustomizationSetting?.home?.popular_products_status && (
        <div className="bg-gray-50 dark:bg-zinc-900 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="mb-10 flex justify-center">
            <div className="text-center w-full lg:w-2/5">
              <h2 className="text-xl lg:text-2xl mb-2  font-semibold">
                <CMSkeletonTwo
                  count={1}
                  height={30}
                  loading={false}
                  error={storeCustomizationError}
                  data={storeCustomizationSetting?.home?.popular_title}
                />
              </h2>
              <p className="text-base font-sans text-gray-600 dark:text-gray-400 leading-6">
                <CMSkeletonTwo
                  count={5}
                  height={10}
                  loading={false}
                  error={storeCustomizationError}
                  data={storeCustomizationSetting?.home?.popular_description}
                />
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="w-full">
              {error ? (
                <CMSkeletonTwo
                  count={20}
                  height={20}
                  error={error}
                  loading={false}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                  {popularProducts
                    ?.slice(
                      0,
                      storeCustomizationSetting?.home
                        ?.latest_discount_product_limit
                    )
                    .map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        attributes={attributes}
                        currency={currency}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* promotional banner card */}
      {storeCustomizationSetting?.home?.delivery_status && (
        <div className="block mx-auto max-w-screen-2xl">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
            <div className="lg:p-16 p-6 bg-emerald-500 shadow-sm border text-black rounded-lg">
              <CardTwo />
            </div>
          </div>
        </div>
      )}

      {/* discounted products */}
      {storeCustomizationSetting?.home?.discount_product_status &&
        discountedProducts?.length > 0 && (
          <div
            id="discount"
            className="bg-gray-50 dark:bg-zinc-800 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2  font-semibold">
                  <CMSkeletonTwo
                    count={1}
                    height={30}
                    loading={false}
                    error={storeCustomizationError}
                    data={
                      storeCustomizationSetting?.home?.latest_discount_title
                    }
                  />
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  <CMSkeletonTwo
                    count={5}
                    height={20}
                    loading={false}
                    error={storeCustomizationError}
                    data={
                      storeCustomizationSetting?.home
                        ?.latest_discount_description
                    }
                  />
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                  {discountedProducts
                    ?.slice(
                      0,
                      storeCustomizationSetting?.home?.popular_product_limit
                    )
                    .map((product) => (
                      <DiscountedCard
                        key={product._id}
                        product={product}
                        currency={currency}
                        attributes={attributes}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Home;
