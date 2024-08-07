import Image from "next/image";
import {pricingCards} from "@/lib/constants";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {clsx} from "clsx";
import {Check} from "lucide-react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

export default function Home() {
    return (
        <>
            <section className={'h-full w-full pt-36 relative flex items-center justify-center flex-col'}>
                {/* Grid */}
                <div className={'absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10'}/>
                <div className={'flex flex-col items-center justify-center pt-32'}>
                    <Badge className={'text-md bg-opacity-15'}>
                        <p className={'text-center'}>
                            Run your agency, in one place
                        </p>
                    </Badge>
                    <div
                        className={'bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative'}>
                        <h1 className={'text-9xl font-bold text-center md:text-[300px]'}>
                            Plura
                        </h1>
                    </div>
                    <div className={'flex justify-center items-center relative md:mt-[-70px]'}>
                        <Image
                            src={'/assets/preview.png'}
                            alt={'banner image'}
                            width={1200}
                            height={1200}
                            className={'rounded-t-2xl border-2 border-muted'}
                        />
                        <div className={'bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10'} />
                    </div>
                </div>
            </section>
            <section className={'flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]'}>
                <h2 className={'text-4xl text-center'}>
                    Choose what fits your right
                </h2>
                <p className={'text-muted-foreground text-center'}>
                    Our straightforward pricing plans are tailored to meet your needs. If you&apos;re not <br />
                    ready to commit you can get started for free.
                </p>
                <div className={'flex justify-center gap-4 flex-wrap mt-6'}>
                    {/*TODO: Wire up free product from stripe*/}
                    {pricingCards.map((card, index) => (
                        <Card
                            key={index}
                            className={clsx('w-[300px] flex flex-col justify-center', {
                                'border-2 border-primary': card.title === 'Unlimited Saas'
                            })}
                        >
                            <CardHeader>
                                <CardTitle className={clsx('',{
                                    'text-muted-foreground': card.title !== 'Unlimited Saas'
                                })}>
                                    {card.title}
                                </CardTitle>
                                <CardDescription>
                                    {card.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <span className={'text-4xl font-bold'}>
                                    {card.price}
                                </span>
                                <span className={'text-muted-foreground'}>
                                    /month
                                </span>
                            </CardContent>
                            <CardFooter className={'flex flex-col items-start gap-4'}>
                                <div>
                                    {card.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className={'flex gap-2 items-start'}
                                        >
                                            <Check  className={'text-muted-foreground'}/>
                                            <p>
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href={`/agency?plan=${card.priceId}`}
                                    className={clsx('w-full text-center bg-primary p-2 rounded-md', {
                                        '!bg-muted-foreground' : card.title !== 'Unlimited Saas'
                                    })}
                                >
                                    Get Started
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    );
}
