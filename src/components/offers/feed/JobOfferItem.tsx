import { getReadableDateFromString } from "@/lib/util";
import Image from "next/image";
import LinkButton from "@/components/ui/LinkButton";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import CompanyLink from "./CompanyLink";
import JobOfferTags from "../common/JobOfferTags";
import defaultJobOfferImage from "@/resources/images/general.jpg";

import classes from "./JobOfferItem.module.scss";

import { type JobOfferInFeed } from "@/lib/api/job-offer/schemas";
import { getImage } from "@/lib/api/image";

const JobOfferItem = ({ item }: { item: JobOfferInFeed }) => {
    const { id, title, endDate, company, tags, image } = item;
    const humanReadableExpirationDate = getReadableDateFromString(endDate);
    const exploreLink = `/job-offers/${id}`;
    const tagClickHandler = (_tag: Tag) => {};
    const imageSource = image ? getImage(image) : defaultJobOfferImage;

    return (
        <li className={classes.item}>
            <Image src={imageSource} alt={title} width={250} height={160} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <CompanyLink
                        companyId={company.id}
                        companyName={company.name}
                    />
                    <div className={classes.date}>
                        <CalendarIcon />
                        <p>{`Закінчується: ${humanReadableExpirationDate}`}</p>
                    </div>
                    {tags.length !== 0 && (
                        <JobOfferTags
                            tags={tags}
                            onClick={tagClickHandler}
                            variant="dark"
                        />
                    )}
                </div>
                <div className={classes.actions}>
                    <LinkButton link={exploreLink} style="light-blue-primary">
                        <span>Більше</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </LinkButton>
                </div>
            </div>
        </li>
    );
};

export default JobOfferItem;
