import React from "react";
import { useRouter } from "next/router";
import { Container } from "../../components/Container";
import { Divider } from "../../components/Divider";
import { Stack } from "../../components/Stack";
import { Text } from "../../components/Typography";
import { CardStackPlusIcon, CookieIcon, ExclamationTriangleIcon, GlobeIcon, HomeIcon, LightningBoltIcon, ListBulletIcon, PersonIcon, StackIcon } from "@radix-ui/react-icons";

const Item: React.FC<{ icon: React.ReactNode, label: string, href: string }> = ({ icon, label, href }) => {
    const { pathname, push } = useRouter();

    const isSelected = pathname === href;

    return (
        <Stack
            // selected={isSelected}
            onClick={() => push(href)}
            gap={8}
            alignItems="center"
            style={{
                padding: '8px 12px',
                backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                cursor: 'pointer',
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
            }}
        >
            {icon}
            <Text font={13}>
                {label}
            </Text>
        </Stack>
    )
};

export const MainLayout: React.FC<React.ComponentProps<'div'>> = ({
    children,
}) => {
    return (
        <Container size='lg' style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <div style={{
                width: 240,
                flexShrink: 0,
                top: 0,
                borderRight: '1px solid var(--c-border)',
            }}>
                <Stack
                    direction="column"
                    gap={4}
                    grow={1}
                    style={{
                        minHeight: '100vh',
                        position: 'sticky',
                        padding: '16px 0',
                        top: 0,
                    }}
                    justifyContent="center"
                >
                    <Item
                        icon={<HomeIcon />}
                        href="/"
                        label="Welcome"
                    />
                    <Item
                        icon={<GlobeIcon />}
                        href="/country"
                        label="Country"
                    />
                    <Item
                        icon={<StackIcon />}
                        href="/diseaseType"
                        label="Disese Types"
                    />
                    <Item
                        icon={<CookieIcon />}
                        href="/disease"
                        label="Disease"
                    />
                    <Item
                        icon={<ExclamationTriangleIcon />}
                        href="/discover"
                        label="Discover"
                    />
                    <Item
                        icon={<PersonIcon />}
                        href="/users"
                        label="Users"
                    />
                    <Item
                        icon={<PersonIcon />}
                        href="/publicServant"
                        label="Public Servant"
                    />
                    <Item
                        icon={<ListBulletIcon />}
                        href="/records"
                        label="Records"
                    />
                    <Item
                        icon={<CardStackPlusIcon />}
                        href="/doctor"
                        label="Doctors"
                    />
                    <Item
                        icon={<LightningBoltIcon />}
                        href="/specialize"
                        label="Specialize"
                    />
                </Stack>
            </div>
            <Container style={{
                padding: 24,
                minHeight: '100vh',
            }} size="md">
                {children}
            </Container>
        </Container>
    )
}