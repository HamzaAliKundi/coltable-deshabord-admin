"use client";

import { useState, useEffect } from "react";
import {
  useAddBannerMutation,
  useGetAllBannersQuery,
  useUpdateBannerMutation,
} from "../../apis/banner";
import toast from "react-hot-toast";
import {
  useAddAdvertisementMutation,
  useGetAllAdsQuery,
  useUpdateAdsMutation,
} from "../../apis/ads";

// Add this skeleton loader component at the top of the file
const BannerSkeleton = () => (
  <div className="aspect-video bg-[#212121] rounded-lg animate-pulse">
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-[#383838]"></div>
    </div>
  </div>
);

const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedBannerType, setSelectedBannerType] = useState<string>("");
  const [uploadingMediaIndex, setUploadingMediaIndex] = useState<{
    home: number | null;
    performer: number | null;
    venue: number | null;
    ad: number | null;
    adPerformer: number | null;
    adVenue: number | null;
  }>({
    home: null,
    performer: null,
    venue: null,
    ad: null,
    adPerformer: null,
    adVenue: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Add loading states for each banner type
  const [loadingStates, setLoadingStates] = useState({
    home: false,
    performer: false,
    venue: false,
    ad: false,
    adPerformer: false,
    adVenue: false,
  });

  const [bannerIds, setBannerIds] = useState({
    home: null as string | null,
    performer: null as string | null,
    venue: null as string | null,
    ad: null as string | null,
    adPerformer: null as string | null,
    adVenue: null as string | null,
  });

  const [advertisementIds, setAdvertisementIds] = useState({
    ad: null as string | null,
    adPerformer: null as string | null,
    adVenue: null as string | null,
  });

  // States for different banner types
  const [homePageBanners, setHomePageBanners] = useState<string[]>(
    Array(4).fill("")
  );
  const [performerBanners, setPerformerBanners] = useState<string[]>(
    Array(4).fill("")
  );
  const [venueBanners, setVenueBanners] = useState<string[]>(Array(4).fill(""));
  const [adBanners, setAdBanners] = useState<string[]>(Array(1).fill(""));
  const [adPerformerBanners, setAdPerformerBanners] = useState<string[]>(
    Array(1).fill("")
  );
  const [adVenueBanners, setAdVenueBanners] = useState<string[]>(
    Array(1).fill("")
  );

  const [addBanner, { isLoading: addBannerLoading }] = useAddBannerMutation();
  const [updateBanner, { isLoading: updateBannerLoading }] =
    useUpdateBannerMutation();

  const [addAdvertisement, { isLoading: adsLoading }] =
    useAddAdvertisementMutation();
  const [updateAd, { isLoading: updateAdsLoading }] = useUpdateAdsMutation();

  // Add loading states for data fetching
  const { data: homeBannerData, isLoading: isHomeLoading } =
    useGetAllBannersQuery("home");
  const { data: performerBannerData, isLoading: isPerformerLoading } =
    useGetAllBannersQuery("performer");
  const { data: venueBannerData, isLoading: isVenueLoading } =
    useGetAllBannersQuery("venue");

  const { data: homeAdData, isLoading: isHomeAdDataLoading } =
    useGetAllAdsQuery("home");
  const { data: performerAdData, isLoading: isPerformerAdDataLoading } =
    useGetAllAdsQuery("performer");
  const { data: venueAdData, isLoading: isVenueAdDataLoading } =
    useGetAllAdsQuery("venue");

  // Add this useEffect to handle API response
  useEffect(() => {
    if (homeBannerData) {
      // Home banners
      const homeBanner = homeBannerData.find(
        (banner: any) => banner.type === "home"
      );
      if (homeBanner) {
        setBannerIds((prev) => ({ ...prev, home: homeBanner._id }));
        setHomePageBanners((prev) => {
          const newBanners = [...prev];
          homeBanner.images.forEach((url: any, index: any) => {
            if (index < newBanners.length) {
              newBanners[index] = url;
            }
          });
          return newBanners;
        });
      }
    }
  }, [homeBannerData]);

  useEffect(() => {
    if (venueBannerData) {
      // venue banners
      const venueBanner = venueBannerData.find(
        (banner: any) => banner.type === "venue"
      );
      if (venueBanner) {
        setBannerIds((prev) => ({ ...prev, venue: venueBanner._id }));
        setVenueBanners((prev) => {
          const newBanners = [...prev];
          venueBanner.images.forEach((url: any, index: any) => {
            if (index < newBanners.length) {
              newBanners[index] = url;
            }
          });
          return newBanners;
        });
      }
    }
  }, [venueBannerData]);

  useEffect(() => {
    if (performerBannerData) {
      // performer banners
      const performerBanner = performerBannerData.find(
        (banner: any) => banner.type === "performer"
      );
      if (performerBanner) {
        setBannerIds((prev) => ({ ...prev, performer: performerBanner._id }));
        setPerformerBanners((prev) => {
          const newBanners = [...prev];
          performerBanner.images.forEach((url: any, index: any) => {
            if (index < newBanners.length) {
              newBanners[index] = url;
            }
          });
          return newBanners;
        });
      }
    }
  }, [performerBannerData]);

  // Add useEffect for home advertisements
  useEffect(() => {
    if (homeAdData) {
      const homeAd = homeAdData.find((ad: any) => ad.type === "home");
      if (homeAd) {
        setAdvertisementIds((prev) => ({ ...prev, ad: homeAd._id }));
        setAdBanners((prev) => {
          const newBanners = [...prev];
          homeAd.images.forEach((url: any, index: any) => {
            if (index < newBanners.length) {
              newBanners[index] = url;
            }
          });
          return newBanners;
        });
      }
    }
  }, [homeAdData]);

  // Add useEffect for performer advertisements
  useEffect(() => {
    if (performerAdData) {
      const performerAd = performerAdData.find(
        (ad: any) => ad.type === "performer"
      );
      if (performerAd) {
        setAdvertisementIds((prev) => ({
          ...prev,
          adPerformer: performerAd._id,
        }));
        setAdPerformerBanners((prev) => {
          const newBanners = [...prev];
          performerAd.images.forEach((url: any, index: any) => {
            if (index < newBanners.length) {
              newBanners[index] = url;
            }
          });
          return newBanners;
        });
      }
    }
  }, [performerAdData]);

  // Add useEffect for venue advertisements
  useEffect(() => {
    if (venueAdData) {
      const venueAd = venueAdData.find((ad: any) => ad.type === "venue");
      if (venueAd) {
        setAdvertisementIds((prev) => ({ ...prev, adVenue: venueAd._id }));
        setAdVenueBanners((prev) => {
          const newBanners = [...prev];
          venueAd.images.forEach((url: any, index: any) => {
            if (index < newBanners.length) {
              newBanners[index] = url;
            }
          });
          return newBanners;
        });
      }
    }
  }, [venueAdData]);

  // Add new state to track unsaved changes
  const [unsavedChanges, setUnsavedChanges] = useState({
    home: false,
    performer: false,
    venue: false,
    ad: false,
    adPerformer: false,
    adVenue: false,
  });

  const handleImageClick = (index: number, bannerType: string) => {
    setIsModalOpen(true);
    setSelectedImage(index);
    setSelectedBannerType(bannerType);
  };

  const generateSHA1 = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleMediaSelect = async (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif";
    input.multiple = false;

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Check file size (25MB = 25 * 1024 * 1024 bytes)
      const maxSize = 25 * 1024 * 1024; // 25MB in bytes
      if (file.size > maxSize) {
        toast.error(
          "File size exceeds 25MB limit. Please choose a smaller file."
        );
        return;
      }

      try {
        setUploadingMediaIndex((prev) => ({
          ...prev,
          [selectedBannerType]: index,
        }));
        setIsModalOpen(false); // Close modal while uploading
        // First show preview
        const previewUrl = URL.createObjectURL(file);

        // Create timestamp for signature
        const timestamp = Math.round(new Date().getTime() / 1000).toString();

        // Create the string to sign
        const str_to_sign = `timestamp=${timestamp}${
          import.meta.env.VITE_CLOUDINARY_API_SECRET
        }`;

        // Generate SHA-1 signature
        const signature = await generateSHA1(str_to_sign);

        // Upload to Cloudinary using signed upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();

        // Update the appropriate state based on banner type
        switch (selectedBannerType) {
          case "home":
            const newHomeBanners = [...homePageBanners];
            newHomeBanners[index] = data.secure_url;
            setHomePageBanners(newHomeBanners);
            setUnsavedChanges((prev) => ({ ...prev, home: true }));
            break;
          case "performer":
            const newPerformerBanners = [...performerBanners];
            newPerformerBanners[index] = data.secure_url;
            setPerformerBanners(newPerformerBanners);
            setUnsavedChanges((prev) => ({ ...prev, performer: true }));
            break;
          case "venue":
            const newVenueBanners = [...venueBanners];
            newVenueBanners[index] = data.secure_url;
            setVenueBanners(newVenueBanners);
            setUnsavedChanges((prev) => ({ ...prev, venue: true }));
            break;
          case "ad":
            const newAdBanners = [...adBanners];
            newAdBanners[index] = data.secure_url;
            setAdBanners(newAdBanners);
            setUnsavedChanges((prev) => ({ ...prev, ad: true }));
            break;
          case "adPerformer":
            const newAdPerformerBanners = [...adPerformerBanners];
            newAdPerformerBanners[index] = data.secure_url;
            setAdPerformerBanners(newAdPerformerBanners);
            setUnsavedChanges((prev) => ({ ...prev, adPerformer: true }));
            break;
          case "adVenue":
            const newAdVenueBanners = [...adVenueBanners];
            newAdVenueBanners[index] = data.secure_url;
            setAdVenueBanners(newAdVenueBanners);
            setUnsavedChanges((prev) => ({ ...prev, adVenue: true }));
            break;
        }

        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload media:", error);
        toast.error("Failed to upload media. Please try again.");
      } finally {
        setUploadingMediaIndex((prev) => ({
          ...prev,
          [selectedBannerType]: null,
        }));
      }
    };

    input.click();
  };

  const handleSaveBanners = async (bannerType: string) => {
    let images: string[];
    let payload: {
      images: string[];
      title: string;
      type: string;
    };

    switch (bannerType) {
      case "home":
        images = homePageBanners.filter((url) => url !== "");
        payload = {
          images,
          title: "Home Page Banner",
          type: "home",
        };
        break;
      case "performer":
        images = performerBanners.filter((url) => url !== "");
        payload = {
          images,
          title: "Performer Profile Page Banner",
          type: "performer",
        };
        break;
      case "venue":
        images = venueBanners.filter((url) => url !== "");
        payload = {
          images,
          title: "Venue Profile Page Banner",
          type: "venue",
        };
        break;
      default:
        return;
    }

    try {
      setLoadingStates((prev) => ({ ...prev, [bannerType]: true }));

      // Check if we have an existing ID for this banner type
      const bannerId = bannerIds[bannerType as keyof typeof bannerIds];

      if (bannerId) {
        // Update existing banner
        await updateBanner({ id: bannerId, payload }).unwrap();
        toast.success("Banner updated successfully!");
      } else {
        // Create new banner
        const result = await addBanner(payload).unwrap();
        // Update our ID state with the new ID
        setBannerIds((prev) => ({ ...prev, [bannerType]: result._id }));
        toast.success("Banner created successfully!");
      }
      // Reset unsaved changes after successful save
      setUnsavedChanges((prev) => ({ ...prev, [bannerType]: false }));
    } catch (error) {
      console.error("Failed to save banners:", error);
      toast.error("Failed to save banners. Please try again.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [bannerType]: false }));
    }
  };

  const handleSaveAdvertisements = async (adType: string) => {
    let images: string[];
    let payload: {
      images: string[];
      title: string;
      type: string;
    };
    let adTypeKey: string;
    let adTypeForApi: string;

    switch (adType) {
      case "ad":
        images = adBanners.filter((url) => url !== "");
        adTypeKey = "ad";
        adTypeForApi = "home";
        payload = {
          images,
          title: "Advertisement Banner",
          type: "home",
        };
        break;
      case "adPerformer":
        images = adPerformerBanners.filter((url) => url !== "");
        adTypeKey = "adPerformer";
        adTypeForApi = "performer";
        payload = {
          images,
          title: "Performer Advertisement Banner",
          type: "performer",
        };
        break;
      case "adVenue":
        images = adVenueBanners.filter((url) => url !== "");
        adTypeKey = "adVenue";
        adTypeForApi = "venue";
        payload = {
          images,
          title: "Venue Advertisement Banner",
          type: "venue",
        };
        break;
      default:
        return;
    }

    try {
      setLoadingStates((prev) => ({ ...prev, [adType]: true }));

      // Check if we have an existing ID for this advertisement type
      const adId = advertisementIds[adTypeKey as keyof typeof advertisementIds];

      if (adId) {
        // Update existing advertisement
        await updateAd({ id: adId, payload }).unwrap();
        toast.success("Advertisement updated successfully!");
      } else {
        // Create new advertisement
        const result = await addAdvertisement(payload).unwrap();
        // Update our ID state with the new ID
        setAdvertisementIds((prev) => ({ ...prev, [adTypeKey]: result._id }));
        toast.success("Advertisement created successfully!");
      }

      // Reset unsaved changes after successful save
      setUnsavedChanges((prev) => ({ ...prev, [adType]: false }));
    } catch (error) {
      console.error("Failed to save advertisement:", error);
      toast.error("Failed to save advertisement. Please try again.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [adType]: false }));
    }
  };

  // Render media preview
  const renderMediaPreview = (
    url: string,
    index: number,
    bannerType: string
  ) => {
    if (!url) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          {uploadingMediaIndex[
            bannerType as keyof typeof uploadingMediaIndex
          ] === index ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white text-sm">Uploading...</span>
            </div>
          ) : (
            <span className="text-[#383838] text-2xl md:text-3xl">+</span>
          )}
        </div>
      );
    }

    return (
      <div className="w-full h-full relative">
        {uploadingMediaIndex[bannerType as keyof typeof uploadingMediaIndex] ===
        index ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-10">
            <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white text-sm mt-2">Uploading...</span>
          </div>
        ) : null}
        <img
          src={url || "/placeholder.svg"}
          alt={`Preview ${index + 1}`}
          className="w-full h-full object-cover object-top rounded-lg"
        />
        {!isEditing &&
          !uploadingMediaIndex[
            bannerType as keyof typeof uploadingMediaIndex
          ] && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-lg">Click to change</span>
            </div>
          )}
      </div>
    );
  };

  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32 mt-6">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-white text-xl md:text-2xl font-bold">
          Banner / Advertisements{" "}
        </h1>
      </div>

      {/* Home Page Banner */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[#FF00A2] text-[20px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle uppercase">
            Home Page Banner
          </h1>
          {unsavedChanges.home && (
            <p className="text-yellow-500 text-sm mt-1">
              * You have unsaved changes
            </p>
          )}
        </div>
        <button
          onClick={() => handleSaveBanners("home")}
          disabled={loadingStates.home || !unsavedChanges.home}
          className="px-6 py-2 rounded-full bg-[#FF00A2] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingStates.home ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isHomeLoading
          ? // Show 4 skeleton loaders while loading
            Array(4)
              .fill(null)
              .map((_, index) => (
                <BannerSkeleton key={`home-skeleton-${index}`} />
              ))
          : homePageBanners.map((url, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index, "home")}
                className="aspect-video   bg-[#212121] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                {renderMediaPreview(url, index, "home")}
              </div>
            ))}
      </div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-[#878787] text-[14px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle lowercase">
          Please upload an image with the dimensions 1440 x 800 pixels
        </h1>
      </div>

      {/* Performer Profile Page Banner */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <div>
          <h1 className="text-[#FF00A2] text-[20px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle uppercase">
            performer profile page banner
          </h1>
          {unsavedChanges.performer && (
            <p className="text-yellow-500 text-sm mt-1">
              * You have unsaved changes
            </p>
          )}
        </div>
        <button
          onClick={() => handleSaveBanners("performer")}
          disabled={loadingStates.performer || !unsavedChanges.performer}
          className="px-6 py-2 rounded-full bg-[#FF00A2] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingStates.performer ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isPerformerLoading
          ? Array(4)
              .fill(null)
              .map((_, index) => (
                <BannerSkeleton key={`performer-skeleton-${index}`} />
              ))
          : performerBanners.map((url, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index, "performer")}
                className="aspect-video bg-[#212121] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                {renderMediaPreview(url, index, "performer")}
              </div>
            ))}
      </div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-[#878787] text-[14px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle lowercase">
          Please upload an image with the dimensions 1440 x 800 pixels
        </h1>
      </div>

      {/* Venue Profile Page Banner */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <div>
          <h1 className="text-[#FF00A2] text-[20px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle uppercase">
            venue profile page banner
          </h1>
          {unsavedChanges.venue && (
            <p className="text-yellow-500 text-sm mt-1">
              * You have unsaved changes
            </p>
          )}
        </div>
        <button
          onClick={() => handleSaveBanners("venue")}
          disabled={loadingStates.venue || !unsavedChanges.venue}
          className="px-6 py-2 rounded-full bg-[#FF00A2] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingStates.venue ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isVenueLoading
          ? Array(4)
              .fill(null)
              .map((_, index) => (
                <BannerSkeleton key={`venue-skeleton-${index}`} />
              ))
          : venueBanners.map((url, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index, "venue")}
                className="aspect-video bg-[#212121] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                {renderMediaPreview(url, index, "venue")}
              </div>
            ))}
      </div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-[#878787] text-[14px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle lowercase">
          Please upload an image with the dimensions 1440 x 800 pixels
        </h1>
      </div>

      {/* Advertisement Banner */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <div>
          <h1 className="text-[#FF00A2] text-[20px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle uppercase">
            advertisement banner
          </h1>
          {unsavedChanges.ad && (
            <p className="text-yellow-500 text-sm mt-1">
              * You have unsaved changes
            </p>
          )}
        </div>
        <button
          onClick={() => handleSaveAdvertisements("ad")}
          disabled={loadingStates.ad || !unsavedChanges.ad}
          className="px-6 py-2 rounded-full bg-[#FF00A2] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingStates.ad ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isHomeAdDataLoading
          ? Array(1)
              .fill(null)
              .map((_, index) => (
                <BannerSkeleton key={`ad-skeleton-${index}`} />
              ))
          : adBanners.map((url, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index, "ad")}
                className="aspect-square bg-[#212121] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                {renderMediaPreview(url, index, "ad")}
              </div>
            ))}
      </div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-[#878787] text-[14px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle lowercase">
          Please upload an image with the dimensions 1200 x 300 pixels
        </h1>
      </div>

      {/* Advertisement Banner Performer Profile */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <div>
          <h1 className="text-[#FF00A2] text-[20px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle uppercase">
            advertisement banner performer profile
          </h1>
          {unsavedChanges.adPerformer && (
            <p className="text-yellow-500 text-sm mt-1">
              * You have unsaved changes
            </p>
          )}
        </div>
        <button
          onClick={() => handleSaveAdvertisements("adPerformer")}
          disabled={loadingStates.adPerformer || !unsavedChanges.adPerformer}
          className="px-6 py-2 rounded-full bg-[#FF00A2] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingStates.adPerformer ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isPerformerAdDataLoading
          ? Array(1)
              .fill(null)
              .map((_, index) => (
                <BannerSkeleton key={`adPerformer-skeleton-${index}`} />
              ))
          : adPerformerBanners.map((url, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index, "adPerformer")}
                className="aspect-square bg-[#212121] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                {renderMediaPreview(url, index, "adPerformer")}
              </div>
            ))}
      </div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-[#878787] text-[14px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle lowercase">
          Please upload an image with the dimensions 520 x 650 pixels
        </h1>
      </div>

      {/* Advertisement Banner Venue Profile */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <div>
          <h1 className="text-[#FF00A2] text-[20px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle uppercase">
            advertisement banner venue profile
          </h1>
          {unsavedChanges.adVenue && (
            <p className="text-yellow-500 text-sm mt-1">
              * You have unsaved changes
            </p>
          )}
        </div>
        <button
          onClick={() => handleSaveAdvertisements("adVenue")}
          disabled={loadingStates.adVenue || !unsavedChanges.adVenue}
          className="px-6 py-2 rounded-full bg-[#FF00A2] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingStates.adVenue ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isVenueAdDataLoading
          ? Array(1)
              .fill(null)
              .map((_, index) => (
                <BannerSkeleton key={`adVenue-skeleton-${index}`} />
              ))
          : adVenueBanners.map((url, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index, "adVenue")}
                className="aspect-square bg-[#212121] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                {renderMediaPreview(url, index, "adVenue")}
              </div>
            ))}
      </div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-[#878787] text-[14px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] align-middle lowercase">
          Please upload an image with the dimensions 520 x 350 pixels
        </h1>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-[#212121] rounded-lg p-10 max-w-[90%] w-[600px] relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#E5E5E5] flex items-center justify-center hover:bg-[#FF00A2] transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Image container with padding */}
            <div className="mb-8 aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden">
              {uploadingMediaIndex[
                selectedBannerType as keyof typeof uploadingMediaIndex
              ] === selectedImage ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white text-sm">Uploading...</span>
                </div>
              ) : (
                selectedImage !== null &&
                (() => {
                  let currentImage = "";
                  switch (selectedBannerType) {
                    case "home":
                      currentImage = homePageBanners[selectedImage];
                      break;
                    case "performer":
                      currentImage = performerBanners[selectedImage];
                      break;
                    case "venue":
                      currentImage = venueBanners[selectedImage];
                      break;
                    case "ad":
                      currentImage = adBanners[selectedImage];
                      break;
                    case "adPerformer":
                      currentImage = adPerformerBanners[selectedImage];
                      break;
                    case "adVenue":
                      currentImage = adVenueBanners[selectedImage];
                      break;
                  }

                  return currentImage ? (
                    <img
                      src={currentImage || "/placeholder.svg"}
                      alt="Current banner"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-600 rounded-lg flex items-center justify-center">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z"
                          stroke="#9CA3AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  );
                })()
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handleMediaSelect(selectedImage!)}
                disabled={
                  uploadingMediaIndex[
                    selectedBannerType as keyof typeof uploadingMediaIndex
                  ] === selectedImage
                }
                className={`w-[150px] sm:w-[200px] px-4 sm:px-6 md:px-8 py-2 rounded-full bg-[#FF00A2] text-white text-sm md:text-base ${
                  uploadingMediaIndex[
                    selectedBannerType as keyof typeof uploadingMediaIndex
                  ] === selectedImage
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {uploadingMediaIndex[
                  selectedBannerType as keyof typeof uploadingMediaIndex
                ] === selectedImage
                  ? "Uploading..."
                  : "+Upload/Replace"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
