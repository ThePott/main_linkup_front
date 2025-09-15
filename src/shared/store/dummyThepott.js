/** 많이 수정해야 합니다 */
class Artist {
    constructor(
        id,
        name,
        debut_date,
        birthdate,
        img_face,
        img_torso,
        img_banner,
        is_group,
        group_name,
    ) {
        this.id = id;
        this.name = name;
        this.debut_date = debut_date;
        this.birthdate = birthdate;
        this.img_face = img_face;
        this.img_torso = img_torso;
        this.img_banner = img_banner;
        this.is_group = is_group;
        this.group_name = group_name;
    }
}

/** 많이 수정해야 합니다 */
export const artistArray = [
    new Artist(
        1,
        "apple",
        new Date(),
        new Date(),
        "",
        "",
        "",
        true,
        "blackpink",
    ),
    new Artist(
        2,
        "apple",
        new Date(),
        new Date(),
        "",
        "",
        "",
        true,
        "blackpink",
    ),
    new Artist(
        3,
        "banana",
        new Date(),
        new Date(),
        "",
        "",
        "",
        true,
        "blackpink",
    ),
    new Artist(
        4,
        "carrot",
        new Date(),
        new Date(),
        "",
        "",
        "",
        true,
        "blackpink",
    ),
    new Artist(
        5,
        "dunkindonut",
        new Date(),
        new Date(),
        "",
        "",
        "",
        true,
        "BLACKBLACK",
    ),
    new Artist(
        6,
        "easport",
        new Date(),
        new Date(),
        "",
        "",
        "",
        true,
        "BLACKBLACK",
    ),
    new Artist(
        7,
        "famicon",
        new Date(),
        new Date(),
        "",
        "",
        "",
        true,
        "BLACKBLACK",
    ),
    new Artist(
        8,
        "ggg",
        new Date(),
        new Date(),
        "",
        "",
        "",
        true,
        "BLACKBLACK",
    ),
    new Artist(9, "AU", new Date(), new Date(), "", "", "", false, undefined),
    new Artist(10, "EU", new Date(), new Date(), "", "", "", false, undefined),
    new Artist(11, "IU", new Date(), new Date(), "", "", "", false, undefined),
    new Artist(12, "OU", new Date(), new Date(), "", "", "", false, undefined),
];

/** 많이 수정해야 합니다 */
export const dummyAgencyUser = {
    id: 1,
    agencyName: "cool and awesome agency",
    managingArtistArray: artistArray,
    role: "admin",
};
