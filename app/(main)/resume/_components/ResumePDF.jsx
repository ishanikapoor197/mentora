
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  contact: {
    fontSize: 10,
    marginBottom: 2,
  },
  section: {
    marginBottom: 14,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
    lineHeight: 1.4,
  },
});

export default function ResumePDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.fullName}</Text>

          {data.email && <Text style={styles.contact}>{data.email}</Text>}
          {data.mobile && <Text style={styles.contact}>{data.mobile}</Text>}

          {data.linkedin && (
            <Link style={styles.contact} src={data.linkedin}>
              LinkedIn
            </Link>
          )}

          {data.twitter && (
            <Link style={styles.contact} src={data.twitter}>
              Twitter
            </Link>
          )}
        </View>

        {/* ===== SUMMARY ===== */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.title}>Professional Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        )}

        {/* ===== SKILLS ===== */}
        {data.skills && (
          <View style={styles.section}>
            <Text style={styles.title}>Skills</Text>
            <Text style={styles.text}>{data.skills}</Text>
          </View>
        )}

        {/* ===== EXPERIENCE ===== */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.title}>Work Experience</Text>
            {data.experience.map((item, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>{item.title}</Text> @{" "}
                  {item.organization}
                </Text>
                <Text style={styles.text}>
                  {item.startDate} - {item.endDate || "Present"}
                </Text>
                <Text style={styles.text}>{item.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ===== EDUCATION ===== */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.title}>Education</Text>
            {data.education.map((item, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>{item.title}</Text> @{" "}
                  {item.organization}
                </Text>
                <Text style={styles.text}>
                  {item.startDate} - {item.endDate || "Present"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ===== PROJECTS ===== */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.title}>Projects</Text>
            {data.projects.map((item, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                </Text>
                <Text style={styles.text}>{item.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
